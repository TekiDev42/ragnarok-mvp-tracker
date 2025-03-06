import { createClient } from '@supabase/supabase-js'
import { defaultMvps as mvps } from './mvps'
import type { Database } from './types/supabase'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY must be set')
}

// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

async function insertMvps() {
    // Insert MVPs
    const { data: mvpData, error: mvpError } = await supabase
        .from('mvps')
        .insert(
            mvps.map(mvp => ({
                id: mvp.Id,
                aegis_name: mvp.AegisName,
                name: mvp.Name,
                japanese_name: mvp.JapaneseName || null,
                level: mvp.Level || null,
                hp: mvp.Hp || null,
                base_exp: mvp.BaseExp || null,
                job_exp: mvp.JobExp || null,
                mvp_exp: mvp.MvpExp || null,
                attack: mvp.Attack || null,
                attack2: mvp.Attack2 || null,
                defense: mvp.Defense || null,
                magic_defense: mvp.MagicDefense || null,
                str: mvp.Str || null,
                agi: mvp.Agi || null,
                vit: mvp.Vit || null,
                int: mvp.Int || null,
                dex: mvp.Dex || null,
                luk: mvp.Luk || null,
                attack_range: mvp.AttackRange || null,
                skill_range: mvp.SkillRange || null,
                chase_range: mvp.ChaseRange || null,
                size: mvp.Size || null,
                race: mvp.Race || null,
                element: mvp.Element || null,
                element_level: mvp.ElementLevel || null,
                walk_speed: mvp.WalkSpeed || null,
                attack_delay: mvp.AttackDelay || null,
                attack_motion: mvp.AttackMotion || null,
                damage_motion: mvp.DamageMotion || null,
                damage_taken: mvp.DamageTaken || null,
                ai: mvp.Ai || null,
                class: mvp.Class || null,
                image: mvp.image
            }))
        )
        .select()

    if (mvpError) {
        console.error('Error inserting MVPs:', mvpError)
        return
    }

    // Insert drops for each MVP
    for (const mvp of mvps) {
        if (mvp.Drops) {
            const { error: dropsError } = await supabase
                .from('drops')
                .insert(
                    mvp.Drops.map(drop => ({
                        mvp_id: mvp.Id,
                        item: drop.Item,
                        rate: drop.Rate,
                        steal_protected: drop.StealProtected || false
                    }))
                )

            if (dropsError) {
                console.error(`Error inserting drops for MVP ${mvp.Name}:`, dropsError)
            }
        }

        if (mvp.MvpDrops) {
            const { error: mvpDropsError } = await supabase
                .from('mvp_drops')
                .insert(
                    mvp.MvpDrops.map(drop => ({
                        mvp_id: mvp.Id,
                        item: drop.Item,
                        rate: drop.Rate,
                        steal_protected: drop.StealProtected || false
                    }))
                )

            if (mvpDropsError) {
                console.error(`Error inserting MVP drops for MVP ${mvp.Name}:`, mvpDropsError)
            }
        }

        if (mvp.mvpMaps) {
            const { error: mvpMapsError } = await supabase
                .from('mvp_maps')
                .insert(
                    mvp.mvpMaps.map(map => ({
                        mvp_id: mvp.Id,
                        name: map.name,
                        death_time: map.deathTime,
                        respawn_timer: map.respawnTimer,
                        tomb_pos_x: map.tombPos.x,
                        tomb_pos_y: map.tombPos.y,
                        height: map.size.height,
                        width: map.size.width
                    }))
                )

            if (mvpMapsError) {
                console.error(`Error inserting MVP maps for MVP ${mvp.Name}:`, mvpMapsError)
            }
        }

        if (mvp.Modes) {
            const { error: mvpModesError } = await supabase
                .from('mvp_modes')
                .insert({
                    mvp_id: mvp.Id,
                    can_move: mvp.Modes.CanMove || false,
                    cast_sensor_idle: mvp.Modes.CastSensorIdle || false,
                    cast_sensor_chase: mvp.Modes.CastSensorChase || false,
                    ignore_melee: mvp.Modes.IgnoreMelee || false,
                    change_chase: mvp.Modes.ChangeChase || false,
                    ignore_magic: mvp.Modes.IgnoreMagic || false,
                    ignore_misc: mvp.Modes.IgnoreMisc || false,
                    ignore_ranged: mvp.Modes.IgnoreRanged || false,
                    no_random_walk: mvp.Modes.NoRandomWalk || false,
                    teleport_block: mvp.Modes.TeleportBlock || false,
                    mvp: mvp.Modes.Mvp || false
                })

            if (mvpModesError) {
                console.error(`Error inserting MVP modes for MVP ${mvp.Name}:`, mvpModesError)
            }
        }
    }
}

insertMvps()
