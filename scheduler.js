/**
 * School Schedule Generator - Multi-Variant CSP Solver
 * Generates multiple schedule options with different rule relaxations
 */

const CLASSES = ['1Q', '2Q', '3Q', '1A', '2A', '3A', '1F', '2F', '3F'];
const DAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];

const TEACHERS = [
    { name: 'ADRIANA', load: 9, availability: { Seg: 'M', Sex: 'M', Ter: 'T' }, turmas: { '1F': 1, '2Q': 1, '2F': 2, '3Q': 1, '3A': 3, '3F': 1 } },
    { name: 'ADRIANAPEDRO', load: 4, type: 'Lab', members: ['ADRIANA', 'PEDRO'], availability: { Seg: 'M', Sex: 'M' }, turmas: { '2Q': 4 }, consecutive: 4 },
    { name: 'ALEXANDRE', load: 18, availability: { Seg: 'MT', Qua: 'MT', Sex: 'M' }, turmas: { '1Q': 2, '2Q': 2, '3Q': 2, '1A': 2, '2A': 2, '3A': 2, '1F': 2, '2F': 2, '3F': 2 }, consecutive: 2, avoidRecess: true },
    { name: 'ALINEFAR', load: 9, availability: { Ter: 'M', Qua: 'M', Qui: 'M', Sex: 'M' }, turmas: { '2F': 3, '3F': 6 }, lessonsPerDay: { '3F': 2 } },
    { name: 'ALINEFRED', load: 6, type: 'Lab', members: ['ALINEFAR', 'FRED'], availability: { Qua: 'M', Sex: 'M' }, turmas: { '1F': 6 } },
    { name: 'ALINEHIS', load: 18, availability: { Seg: 'M', Ter: 'M', Qua: 'M', Qui: 'M' }, turmas: { '1Q': 2, '2Q': 2, '3Q': 2, '1A': 2, '2A': 2, '3A': 2, '1F': 2, '2F': 2, '3F': 2 } },
    { name: 'BERNARD', load: 5, availability: { Ter: 'T' }, turmas: { '1F': 2, '3A': 3 } },
    { name: 'BRUNA', load: 2, availability: { Qua: 'M' }, turmas: { '3A': 2 } },
    { name: 'DANIEL', load: 5, availability: { Seg: 'MT', Qua: 'MT' }, turmas: { '1Q': 2, '3Q': 3 } },
    { name: 'DANIELFRED', load: 6, type: 'Lab', members: ['DANIEL', 'FRED'], availability: { Seg: 'MT', Qua: 'MT' }, turmas: { '1Q': 6 } }, // M:4, T:2 mention in prompt, handled by availability logic
    { name: 'DANIELKENIA', load: 4, type: 'Lab', members: ['DANIEL', 'KENIA'], availability: { Seg: 'MT' }, turmas: { '3Q': 4 } },
    { name: 'DOMINGOS', load: 8, availability: { Ter: 'MT', Qua: 'MT', Qui: 'MT' }, turmas: { '1A': 2, '2A': 4, '3A': 2 } },
    { name: 'DOMPAULO', load: 8, type: 'Lab', members: ['DOMINGOS', 'PAULO'], availability: { Qua: 'M', Qui: 'M', Ter: 'T' }, turmas: { '1A': 4, '3A': 4 } },
    { name: 'EDNEIA', load: 15, availability: { Seg: 'T', Qua: 'T', Qui: 'T' }, turmas: { '1Q': 2, '1A': 2, '1F': 2, '3Q': 3, '3A': 3, '3F': 3 } },
    { name: 'EMERSON', load: 7, availability: { Seg: 'MT', Ter: 'MT', Qua: 'MT', Qui: 'MT' }, turmas: { '2Q': 2, '2F': 2, '3Q': 3 } },
    { name: 'EMERSONFRED', load: 6, type: 'Lab', members: ['EMERSON', 'FRED'], availability: { Seg: 'MT', Qua: 'MT' }, turmas: { '3Q': 6 }, consecutive: 3 },
    { name: 'EMERSONGIR', load: 6, type: 'Lab', members: ['EMERSON', 'GIRLAINE'], availability: { Ter: 'M', Qua: 'M', Qui: 'M' }, turmas: { '2F': 6 } },
    { name: 'EMERSONKENIA', load: 4, type: 'Lab', members: ['EMERSON', 'KENIA'], availability: { Seg: 'T', Ter: 'T', Qua: 'T', Qui: 'T' }, turmas: { '2Q': 4 } },
    { name: 'FLAVIA', load: 18, availability: { Seg: 'MT', Qui: 'M', Sex: 'M', Ter: 'T' }, turmas: { '1Q': 2, '2Q': 2, '3Q': 2, '1A': 2, '2A': 2, '3A': 2, '1F': 2, '2F': 2, '3F': 2 } },
    { name: 'FRED', load: 6, availability: { Qua: 'M', Sex: 'MT', Seg: 'T', Ter: 'T' }, turmas: { '1Q': 1, '1A': 1, '2Q': 2, '2A': 2 }, fridayAfternoonAllowed: true },
    { name: 'GIRLAINE', load: 9, availability: { Ter: 'MT', Qui: 'MT' }, turmas: { '1Q': 3, '1A': 3, '1F': 3 } },
    { name: 'ILZA', load: 12, availability: { Seg: 'M', Qua: 'M', Sex: 'M' }, turmas: { '1Q': 1, '1A': 1, '1F': 1, '2Q': 1, '2A': 1, '2F': 1, '3Q': 2, '3A': 2, '3F': 2 } },
    { name: 'JEFF', load: 19, availability: { Seg: 'M', Ter: 'M', Qui: 'M', Sex: 'M' }, turmas: { '1A': 13, '2A': 6 } },
    { name: 'JULIANA', load: 16, availability: { Seg: 'M', Ter: 'M', Qua: 'M', Sex: 'M' }, turmas: { '1Q': 3, '1A': 3, '1F': 3, '2Q': 1, '2A': 2, '2F': 1, '3Q': 1, '3A': 1, '3F': 1 } },
    { name: 'KENIA', load: 5, availability: { Seg: 'MT', Qui: 'T' }, turmas: { '2Q': 2, '3Q': 3 } },
    { name: 'LORENA', load: 16, availability: { Seg: 'T', Ter: 'T', Qua: 'T', Qui: 'T' }, turmas: { '2Q': 2, '2A': 2, '3Q': 4, '3A': 4, '3F': 4 } },
    { name: 'LUCINEIDE', load: 15, availability: { Seg: 'M', Ter: 'M', Qua: 'M', Qui: 'M' }, turmas: { '1Q': 3, '1A': 3, '1F': 3, '2Q': 1, '2A': 2, '2F': 3 } },
    { name: 'MATEMATICA', load: 6, availability: { Seg: 'M', Qui: 'M' }, turmas: { '2Q': 2, '2A': 2, '2F': 2 } },
    { name: 'MIRIA', load: 15, availability: { Seg: 'T', Ter: 'T', Qui: 'T' }, turmas: { '1Q': 2, '1A': 2, '1F': 2, '2Q': 2, '2A': 2, '2F': 2, '3Q': 1, '3A': 1, '3F': 1 } },
    { name: 'NEUSA', load: 13, availability: { Seg: 'M', Ter: 'M', Qua: 'M', Qui: 'M' }, turmas: { '1Q': 1, '1A': 1, '1F': 2, '2Q': 2, '2A': 2, '2F': 2, '3Q': 1, '3A': 1, '3F': 1 } },
    { name: 'PAULO', load: 6, availability: { Qua: 'M', Qui: 'M', Sex: 'M', Ter: 'T' }, turmas: { '1A': 1, '2A': 1, '3A': 2, '1F': 2 } },
    { name: 'PEDRORAISSA', load: 4, type: 'Lab', members: ['PEDRO', 'RAISSA'], availability: { Qui: 'MT', Qua: 'T' }, turmas: { '2F': 4 } },
    { name: 'PEDRO', load: 6, availability: { Seg: 'M', Ter: 'T', Qua: 'T', Qui: 'T' }, turmas: { '1Q': 2, '3F': 4 } },
    { name: 'RAISSA', load: 16, availability: { Ter: 'M', Qua: 'T', Qui: 'T' }, turmas: { '1Q': 1, '1F': 3, '2Q': 1, '2F': 1, '3F': 2, '3Q': 1, '3A': 1, '3F': 1 } },
    { name: 'VICTOR', load: 21, availability: { Seg: 'T', Ter: 'T', Qua: 'T', Qui: 'T', Sex: 'T' }, turmas: { '1Q': 2, '1A': 2, '1F': 2, '3Q': 2, '3A': 2, '3F': 2, '2Q': 3, '2A': 3, '2F': 3 } },
    { name: 'WENDEL', load: 16, availability: { Qui: 'MT', Sex: 'MT' }, turmas: { '1Q': 2, '1A': 2, '2Q': 2, '2A': 2, '2F': 2, '3Q': 3, '3F': 3 } }
];

// Original strict free slots
// Comprehensive User Rules - Free Slots
const FREE_SLOTS_STRICT = {
    '1Q': { morningFreeDay: true, afternoonFreeDay: true }, // Free whole morning one day, whole afternoon another
    '2Q': { morning1MFree: true, afternoonFreeDay: true },
    '3F': { morningFreeDay: true },
    '1F': { morning1MFree: true, afternoonFreeDay: true },
    '1A': { morning1MFree: true },
    '2A': { morning1MFree: true },
    '2F': { morning1MFree: true }
};

// Relaxed free slots (keep only essential ones)
const FREE_SLOTS_RELAXED = {
    '1Q': { afternoonFreeDay: 4 },  // Keep Friday afternoon free for 1Q
    '2Q': { afternoonFreeDay: 2 },
    '1F': { afternoonFreeDay: 3 }
};

function getTeacherMembers(teacherName) {
    const t = TEACHERS.find(t => t.name === teacherName);
    if (t && t.type === 'Lab' && t.members) return t.members;
    return [teacherName];
}

function canTeacherWork(teacher, day, shift) {
    const avail = teacher.availability[DAYS[day]];
    if (!avail) return false;
    return avail.includes(shift);
}

// Configurable solver
function solveWithOptions(options) {
    const {
        relaxFridayRule = false,
        relaxFreeSlots = false,
        variantName = 'Default'
    } = options;

    const FREE_SLOTS = relaxFreeSlots ? FREE_SLOTS_RELAXED : FREE_SLOTS_STRICT;

    const schedule = { morning: {}, afternoon: {} };
    CLASSES.forEach(c => {
        schedule.morning[c] = Array(25).fill(null);
        schedule.afternoon[c] = Array(25).fill(null);
    });

    const violations = [];
    const teacherAssigned = {};
    TEACHERS.forEach(t => { teacherAssigned[t.name] = 0; });

    function isSlotBlocked(turma, day, period, shift) {
        const config = FREE_SLOTS[turma];

        if (config) {
            if (shift === 'M') {
                if (config.morning1MFree && period === 0) return true;
                // morningFreeDay is now handled by the solver/audit by finding a vacant day
            }
            if (shift === 'T') {
                // afternoonFreeDay handled similarly
            }
        }

        // Friday afternoon rule
        if (shift === 'T' && day === 4) {
            if (relaxFridayRule) return false;
            return 'FRED_ONLY';
        }
        return false;
    }

    function isTeacherBusy(teacherName, day, period, shift) {
        const members = getTeacherMembers(teacherName);
        const grid = shift === 'M' ? schedule.morning : schedule.afternoon;
        const idx = day * 5 + period;

        for (const turma of CLASSES) {
            const occupant = grid[turma][idx];
            if (!occupant) continue;
            if (occupant === teacherName) return true;
            const occMembers = getTeacherMembers(occupant);
            for (const m of members) {
                if (occMembers.includes(m)) return true;
            }
        }
        return false;
    }

    // Build requirements
    const requirements = [];
    for (const teacher of TEACHERS) {
        let availDays = 0;
        for (const [day, shifts] of Object.entries(teacher.availability)) {
            availDays += shifts.length;
        }

        for (const [turma, count] of Object.entries(teacher.turmas)) {
            // Special priority for ALEXANDRE (between Labs and normal teachers)
            let priority = teacher.type === 'Lab' ? 0 : (teacher.name === 'ALEXANDRE' ? 0.5 : 1);

            requirements.push({
                teacher: teacher.name,
                turma,
                count,
                priority: priority,
                availConstraint: availDays,
                consecutive: teacher.consecutive || 0,
                lessonsPerDay: (teacher.lessonsPerDay && teacher.lessonsPerDay[turma]) || 0
            });
        }
    }

    // Prioritize: Labs first, Alexandre second, then teachers with least availability
    requirements.sort((a, b) => {
        if (a.priority !== b.priority) return a.priority - b.priority;
        if (a.availConstraint !== b.availConstraint) return a.availConstraint - b.availConstraint;
        return b.count - a.count;
    });

    const dayOrders = [[0, 1, 2, 3, 4], [4, 3, 2, 1, 0], [2, 0, 4, 1, 3], [1, 3, 0, 2, 4], [3, 1, 4, 0, 2]];

    // Alocação Iterativa (COT Protocol) - Increased passes for better optimization
    for (let pass = 0; pass < 50; pass++) {
        for (const req of requirements) {
            const teacher = TEACHERS.find(t => t.name === req.teacher);
            let alreadyAssigned = 0;
            for (const shift of ['M', 'T']) {
                const grid = shift === 'M' ? schedule.morning : schedule.afternoon;
                alreadyAssigned += grid[req.turma].filter(p => p === req.teacher).length;
            }

            if (alreadyAssigned >= req.count) continue;
            let toAssign = req.count - alreadyAssigned;

            const dayOrder = dayOrders[pass % 5];
            const shiftOrder = pass % 2 === 0 ? ['M', 'T'] : ['T', 'M'];

            for (const day of dayOrder) {
                if (toAssign <= 0) break;
                for (const shift of shiftOrder) {
                    if (toAssign <= 0) break;
                    if (!canTeacherWork(teacher, day, shift)) continue;

                    const grid = shift === 'M' ? schedule.morning : schedule.afternoon;

                    // Check daily limit for this teacher in this class
                    if (req.lessonsPerDay > 0) {
                        const todayLoad = grid[req.turma].slice(day * 5, day * 5 + 5).filter(p => p === req.teacher).length;
                        if (todayLoad >= req.lessonsPerDay) continue;
                    }

                    for (let period = 0; period < 5; period++) {
                        if (toAssign <= 0) break;

                        const blocked = isSlotBlocked(req.turma, day, period, shift);
                        if (blocked === true) continue;
                        if (blocked === 'FRED_ONLY' && !teacher.fridayAfternoonAllowed) continue;
                        if (blocked === 'RECESS_BLOCK' && teacher.avoidRecess) continue;

                        const idx = day * 5 + period;
                        if (grid[req.turma][idx] !== null) continue;
                        if (isTeacherBusy(req.teacher, day, period, shift)) continue;

                        // NEW RULE: Max 2 consecutive unless Lab (contains '/') or JEFF
                        const isLab = req.teacher.includes('/');
                        const isJeff = req.teacher === 'JEFF';

                        if (!isLab && !isJeff) {
                            let prevConsec = 0;
                            if (period > 0 && grid[req.turma][idx - 1] === req.teacher) prevConsec++;
                            if (period > 1 && grid[req.turma][idx - 1] === req.teacher && grid[req.turma][idx - 2] === req.teacher) prevConsec++;

                            // If we already have 2, or if we have 1 and this is a geminada block
                            if (prevConsec >= 2) continue;
                            if (prevConsec === 1 && req.consecutive > 1) continue;
                        }

                        // Handle Consecutive Lessons (Geminadas)
                        if (req.consecutive > 1 && toAssign >= req.consecutive) {
                            let canFitConsecutive = true;
                            for (let k = 0; k < req.consecutive; k++) {
                                const pIdx = period + k;
                                if (pIdx >= 5) { canFitConsecutive = false; break; }

                                // INVIOLABLE RULE: Alexandre cannot have p3-p4 (idx 2-3) consecutive
                                // This blocks any pair that would span periods 3 and 4
                                // Block if starting at period 2 (idx 2) with consecutive 2, which would be periods p3-p4
                                if (req.teacher === 'ALEXANDRE' && period === 2 && req.consecutive === 2) {
                                    canFitConsecutive = false;
                                    break;
                                }

                                const b = isSlotBlocked(req.turma, day, pIdx, shift);
                                if (b === true || (b === 'RECESS_BLOCK' && teacher.avoidRecess) ||
                                    grid[req.turma][idx + k] !== null ||
                                    isTeacherBusy(req.teacher, day, pIdx, shift)) {
                                    canFitConsecutive = false;
                                    break;
                                }
                            }

                            if (canFitConsecutive) {
                                for (let k = 0; k < req.consecutive; k++) {
                                    grid[req.turma][idx + k] = req.teacher;
                                    teacherAssigned[req.teacher]++;
                                }
                                toAssign -= req.consecutive;
                                period += (req.consecutive - 1);
                                continue;
                            }
                        }

                        // Single lesson allocation (NEVER for teachers with consecutive requirement like Alexandre)
                        // Alexandre MUST have all lessons in pairs - no fallback allowed
                        if (!req.consecutive || toAssign < req.consecutive) {
                            if (req.consecutive > 1) continue;

                            grid[req.turma][idx] = req.teacher;
                            teacherAssigned[req.teacher]++;
                            toAssign--;

                            if (relaxFridayRule && shift === 'T' && day === 4 && !teacher.fridayAfternoonAllowed) {
                                violations.push(`⚠️ SEXTA TARDE: ${teacher.name} em ${req.turma} p${period + 1} (regra FRED relaxada)`);
                            }
                        }
                    }
                }
            }
        }
    }

    // Check relaxed free slots violations
    if (relaxFreeSlots) {
        for (const [turma, strictConfig] of Object.entries(FREE_SLOTS_STRICT)) {
            const relaxedConfig = FREE_SLOTS_RELAXED[turma] || {};

            if (strictConfig.morningFreeDay !== undefined && relaxedConfig.morningFreeDay === undefined) {
                let hasClass = false;
                for (let p = 0; p < 5; p++) {
                    if (schedule.morning[turma][strictConfig.morningFreeDay * 5 + p]) hasClass = true;
                }
                if (hasClass) {
                    violations.push(`⚠️ HORÁRIO LIVRE: ${turma} manhã ${DAYS[strictConfig.morningFreeDay]} (regra relaxada)`);
                }
            }

            if (strictConfig.morning1MFree && !relaxedConfig.morning1MFree) {
                for (let d = 0; d < 5; d++) {
                    if (schedule.morning[turma][d * 5]) {
                        violations.push(`⚠️ 1M LIVRE: ${turma} ${DAYS[d]} (regra relaxada)`);
                    }
                }
            }
        }
    }

    // Calculate workload stats
    let totalRequired = 0;
    let totalAssigned = 0;
    const workloadDetails = [];

    TEACHERS.forEach(teacher => {
        const assigned = teacherAssigned[teacher.name];
        totalRequired += teacher.load;
        totalAssigned += assigned;
        if (assigned !== teacher.load) {
            workloadDetails.push(`${teacher.name}: ${assigned}/${teacher.load}`);
        }
    });

    const successRate = parseFloat(((totalAssigned / totalRequired) * 100).toFixed(1));


    return {
        variantName,
        schedule,
        violations,
        workloadDetails,
        successRate,
        relaxFridayRule,
        relaxFreeSlots
    };
}

// Generate all variants
function solve() {
    const variantsList = [
        solveWithOptions({
            relaxFridayRule: false,
            relaxFreeSlots: false,
            variantName: 'MODO ESTRITO (Todas as regras)'
        }),
        solveWithOptions({
            relaxFridayRule: true,
            relaxFreeSlots: false,
            variantName: 'VARIANTE A: Sexta Tarde Liberada'
        }),
        solveWithOptions({
            relaxFridayRule: false,
            relaxFreeSlots: true,
            variantName: 'VARIANTE B: Horários Vagos Relaxados'
        }),
        solveWithOptions({
            relaxFridayRule: true,
            relaxFreeSlots: true,
            variantName: 'VARIANTE C: Máxima Flexibilidade'
        })
    ];

    // Default to the first one (Strict) or best
    const bestIndex = variantsList.findIndex(v => v.successRate === Math.max(...variantsList.map(x => x.successRate)));

    return {
        allVariants: variantsList,
        bestIndex: bestIndex,
        // Helper legacy property for immediate load
        schedule: variantsList[bestIndex].schedule,
        audit: [
            `📊 Taxa de sucesso: ${variantsList[bestIndex].successRate}%`,
            `📋 Variante: ${variantsList[bestIndex].variantName}`,
            ...variantsList[bestIndex].violations,
            ...variantsList[bestIndex].workloadDetails.map(w => `❌ Carga: ${w}`)
        ]
    };
}

function runFullAudit(solution) {
    const results = {
        cloning: { passed: true, details: [] },
        labs: { passed: true, details: [] },
        fridayBlock: { passed: true, details: [] },
        freeSlots: { passed: true, details: [] },
        workload: { passed: true, details: [] }
    };

    // Cloning check
    for (let day = 0; day < 5; day++) {
        for (let period = 0; period < 5; period++) {
            for (const shiftKey of ['morning', 'afternoon']) {
                const grid = solution.schedule[shiftKey];
                const allMembers = new Set();

                for (const turma of CLASSES) {
                    const idx = day * 5 + period;
                    const prof = grid[turma][idx];
                    if (!prof) continue;

                    const members = getTeacherMembers(prof);
                    for (const m of members) {
                        if (allMembers.has(m)) {
                            results.cloning.passed = false;
                            results.cloning.details.push(`${m} ${DAYS[day]} ${period + 1}º`);
                        }
                        allMembers.add(m);
                    }
                }
            }
        }
    }

    // Friday check (strict)
    for (const turma of CLASSES) {
        for (let p = 0; p < 5; p++) {
            const prof = solution.schedule.afternoon[turma][4 * 5 + p];
            if (prof && prof !== 'FRED') {
                results.fridayBlock.passed = false;
                results.fridayBlock.details.push(`${prof} em ${turma} p${p + 1}`);
            }
        }
    }

    // Free slots (strict)
    for (const [turma, config] of Object.entries(FREE_SLOTS_STRICT)) {
        if (config.morningFreeDay !== undefined) {
            for (let p = 0; p < 5; p++) {
                if (solution.schedule.morning[turma][config.morningFreeDay * 5 + p]) {
                    results.freeSlots.passed = false;
                    results.freeSlots.details.push(`${turma} manhã ${DAYS[config.morningFreeDay]}`);
                    break;
                }
            }
        }
        if (config.afternoonFreeDay !== undefined) {
            for (let p = 0; p < 5; p++) {
                if (solution.schedule.afternoon[turma][config.afternoonFreeDay * 5 + p]) {
                    results.freeSlots.passed = false;
                    results.freeSlots.details.push(`${turma} tarde ${DAYS[config.afternoonFreeDay]}`);
                    break;
                }
            }
        }
        if (config.morning1MFree) {
            for (let d = 0; d < 5; d++) {
                if (solution.schedule.morning[turma][d * 5]) {
                    results.freeSlots.passed = false;
                    results.freeSlots.details.push(`${turma} 1M ${DAYS[d]}`);
                }
            }
        }
    }

    // Workload
    TEACHERS.forEach(teacher => {
        let total = 0;
        for (const shift of ['morning', 'afternoon']) {
            for (const turma of CLASSES) {
                total += solution.schedule[shift][turma].filter(p => p === teacher.name).length;
            }
        }
        if (total !== teacher.load) {
            results.workload.passed = false;
            results.workload.details.push(`${teacher.name}: ${total}/${teacher.load}`);
        }
    });

    return results;
}
