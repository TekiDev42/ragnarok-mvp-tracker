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

const importMvps = async () => {
    mvps.forEach(async (mvp, index) => {
        const { data, error } = await supabase
            .from('mvps')
            .insert({
                aegis_name: mvp.AegisName,
                agi: mvp.Agi ?? null,
                ai: mvp.Ai ?? null,
                attack: mvp.Attack ?? null,
                attack_delay: mvp.AttackDelay ?? null,
                attack_motion: mvp.AttackMotion ?? null,
                attack2: mvp.Attack2 ?? null,
                base_exp: mvp.BaseExp ?? null,
                chase_range: mvp.ChaseRange ?? null,
                class: mvp.Class,
                client_attack_motion: mvp.ClientAttackMotion ?? null,
                damage_motion: mvp.DamageMotion ?? null,
                damage_taken: mvp.DamageTaken ?? null,
                defense: mvp.Defense ?? null,
                dex: mvp.Dex ?? null,
                element: mvp.Element,
                element_level: mvp.ElementLevel ?? null,
                hp: mvp.Hp ?? null,
                mvp_id: mvp.Id,
                image: mvp.image,
                int: mvp.Int ?? null,
                is_bookmark: mvp.isBookmark,
                japanese_name: mvp.JapaneseName ?? null,
                job_exp: mvp.JobExp ?? null,
                level: mvp.Level ?? null,
                luk: mvp.Luk ?? null,
                magic_defense: mvp.MagicDefense ?? null,
                magic_resistance: mvp.MagicResistance ?? null,
                mvp_exp: mvp.MvpExp ?? null,
                name: mvp.Name,
                race: mvp.Race ?? null,
                resistance: mvp.Resistance ?? null,
                size: mvp.Size ?? null,
                skill_range: mvp.SkillRange ?? null,
                sp: mvp.Sp ?? null,
                str: mvp.Str ?? null,
                walk_speed: mvp.WalkSpeed ?? null,
            })
            .select()

        if (error) {
            console.error('Error inserting mvp', error)
            return
        }

        if (mvp.mvpMaps) {
            const { data: mvpMaps, error: mvpMapsError } = await supabase
                .from('mvp_maps')
                .insert(mvp.mvpMaps.map((map) => ({
                    mvp_id: data[0].id,
                    name: map.name,
                    respawn_timer: map.respawnTimer,
                    death_time: map.deathTime,
                    map_height: map.size.height,
                    map_width: map.size.width,
                    tomb_pos_x: map.tombPos.x,
                    tomb_pos_y: map.tombPos.y,
                })))
                .select()

            if (mvpMapsError) {
                console.error(mvpMapsError)
                return
            }
        }

        if (mvp.MvpDrops) {
            const { data: mvpDrops, error: mvpDropsError } = await supabase
                .from('mvp_drops')
                .insert(mvp.MvpDrops.map((drop) => ({
                    mvp_id: data[0].id,
                    item: drop.Item,
                    rate: drop.Rate,
                    steal_protected: drop.StealProtected ?? null,
                    random_option_group: drop.RandomOptionGroup ?? null,
                    index: drop.Index ?? null,
                    is_mvp_drop: true,
                })))

            if (mvpDropsError) {
                console.error('Error inserting mvp drops', mvpDropsError)
                return
            }
        }

        if (mvp.Drops) {
            const { data: mvpDrops, error: mvpDropsError } = await supabase
                .from('mvp_drops')
                .insert(mvp.Drops.map((drop) => ({
                    mvp_id: data[0].id,
                    item: drop.Item,
                    rate: drop.Rate,
                    steal_protected: drop.StealProtected ?? null,
                    random_option_group: drop.RandomOptionGroup ?? null,
                    index: drop.Index ?? null,
                    is_mvp_drop: false,
                })))

            if (mvpDropsError) {
                console.error('Error inserting drops', mvpDropsError)
                return
            }
        }

        if (mvp.Modes) {
            const { data: mvpModes, error: mvpModesError } = await supabase
                .from('mvp_modes')
                .insert({
                    mvp_id: data[0].id,
                    can_move: mvp.Modes.CanMove ?? null,
                    cast_sensor_idle: mvp.Modes.CastSensorIdle ?? null,
                    cast_sensor_chase: mvp.Modes.CastSensorChase ?? null,
                    ignore_melee: mvp.Modes.IgnoreMelee ?? null,
                    change_chase: mvp.Modes.ChangeChase ?? null,
                    ignore_magic: mvp.Modes.IgnoreMagic ?? null,
                    ignore_misc: mvp.Modes.IgnoreMisc ?? null,
                    ignore_ranged: mvp.Modes.IgnoreRanged ?? null,
                    no_random_walk: mvp.Modes.NoRandomWalk ?? null,
                    teleport_block: mvp.Modes.TeleportBlock ?? null,
                    mvp: mvp.Modes.Mvp ?? null,
                })
                .select()

            if (mvpModesError) {
                console.error('Error inserting mvp modes', mvpModesError)
                return
            }
        }

        if (mvp.RaceGroups) {
            const { data: mvpRaceGroups, error: mvpRaceGroupsError } = await supabase
                .from('mvp_race_groups')
                .insert(Object.entries(mvp.RaceGroups).map(([key, value]) => ({
                    mvp_id: data[0].id,
                    group_name: key,
                    enabled: value,
                })))
                .select()

            if (mvpRaceGroupsError) {
                console.error('Error inserting mvp race groups', mvpRaceGroupsError)
                return
            }
        }
    })
}

importMvps()
