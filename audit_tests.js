/**
 * Rigorous Audit Test Suite
 * Verifies 100% of the rules provided by the user.
 */

function runFullAudit(solution) {
    const results = {
        cloning: { passed: true, details: [] },
        labs: { passed: true, details: [] },
        fridayBlock: { passed: true, details: [] },
        freeSlots: { passed: true, details: [] },
        workload: { passed: true, details: [] },
        alexandre: { passed: true, details: [] }
    };

    const schedule = solution.schedule;
    const classes = ['1Q', '2Q', '3Q', '1A', '2A', '3A', '1F', '2F', '3F'];
    const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];
    const teachers = TEACHERS; // Global from scheduler.js

    // 1. Clonagem Proibida
    for (let d = 0; d < 5; d++) {
        for (let p = 0; p < 5; p++) {
            ['morning', 'afternoon'].forEach(shift => {
                const seenTeachers = new Set();
                classes.forEach(c => {
                    const prof = schedule[shift][c][d * 5 + p];
                    if (prof) {
                        if (seenTeachers.has(prof)) {
                            results.cloning.passed = false;
                            results.cloning.details.push(`Clone: ${prof} em várias turmas em ${days[d]} p ${p + 1} (${shift})`);
                        }
                        seenTeachers.add(prof);
                    }
                });
            });
        }
    }

    // 2. Duplas/Lab Bloqueio
    for (let d = 0; d < 5; d++) {
        for (let p = 0; p < 5; p++) {
            ['morning', 'afternoon'].forEach(shift => {
                const currentProfs = classes.map(c => schedule[shift][c][d * 5 + p]).filter(p => p);
                currentProfs.forEach(prof => {
                    const tObj = teachers.find(t => t.name === prof);
                    if (tObj && tObj.type === 'Lab') {
                        tObj.members.forEach(m => {
                            if (currentProfs.includes(m)) {
                                results.labs.passed = false;
                                results.labs.details.push(`Conflito Lab: ${prof} e membro ${m} ativos juntos em ${days[d]} p ${p + 1}`);
                            }
                        });
                    }
                });
            });
        }
    }

    // 3. Sexta Tarde (BLOQUEIO TOTAL exceto para FRED)
    for (let p = 0; p < 5; p++) {
        classes.forEach(c => {
            const prof = schedule.afternoon[c][4 * 5 + p]; // Sexta is index 4
            if (prof && prof !== 'FRED') {
                results.fridayBlock.passed = false;
                results.fridayBlock.details.push(`Sexta Tarde violada: ${prof} em ${c} p ${p + 1}`);
            }
        });
    }

    // 4. Horários Vagos Obrigatórios
    // [ ] 1Q: Manhã Livre (1 dia) E Tarde Livre (1 dia)
    // [ ] 2Q: 1M Livre E Tarde Livre (1 dia)
    // [ ] 3F: Manhã Livre (1 dia)
    // [ ] 1F: 1M Livre E Tarde Livre (1 dia)
    // [ ] 1A, 2A, 2F: 1M Livre

    // Check 1Q
    let q1MLivre = false; let q1TLivre = false;
    for (let d = 0; d < 5; d++) {
        if (schedule.morning['1Q'].slice(d * 5, d * 5 + 5).every(p => p === null)) q1MLivre = true;
        if (schedule.afternoon['1Q'].slice(d * 5, d * 5 + 5).every(p => p === null)) q1TLivre = true;
    }
    if (!q1MLivre || !q1TLivre) {
        results.freeSlots.passed = false;
        results.freeSlots.details.push(`1Q: Não possui dia completo livre (M:${q1MLivre}, T:${q1TLivre})`);
    }

    // Check 2Q
    let q2TLivre = false;
    const q2M1Livre = schedule.morning['2Q'].filter((v, i) => i % 5 === 0).every(p => p === null);
    for (let d = 0; d < 5; d++) {
        if (schedule.afternoon['2Q'].slice(d * 5, d * 5 + 5).every(p => p === null)) q2TLivre = true;
    }
    if (!q2M1Livre || !q2TLivre) {
        results.freeSlots.passed = false;
        results.freeSlots.details.push(`2Q: Falha em 1M Livre ou dia Tarde Livre`);
    }

    // Check 1F
    let f1TLivre = false;
    const f1M1Livre = schedule.morning['1F'].filter((v, i) => i % 5 === 0).every(p => p === null);
    for (let d = 0; d < 5; d++) {
        if (schedule.afternoon['1F'].slice(d * 5, d * 5 + 5).every(p => p === null)) f1TLivre = true;
    }
    if (!f1M1Livre || !f1TLivre) {
        results.freeSlots.passed = false;
        results.freeSlots.details.push(`1F: Falha em 1M Livre ou dia Tarde Livre`);
    }

    // Check 3F
    let f3MLivre = false;
    for (let d = 0; d < 5; d++) {
        if (schedule.morning['3F'].slice(d * 5, d * 5 + 5).every(p => p === null)) f3MLivre = true;
    }
    if (!f3MLivre) {
        results.freeSlots.passed = false;
        results.freeSlots.details.push(`3F: Não possui manhã livre em nenhum dia`);
    }

    // Check 1A, 2A, 2F (1M Livre)
    ['1A', '2A', '2F'].forEach(c => {
        const m1Livre = schedule.morning[c].filter((v, i) => i % 5 === 0).every(p => p === null);
        if (!m1Livre) {
            results.freeSlots.passed = false;
            results.freeSlots.details.push(`${c}: Não possui primeiro horário da manhã (1M) livre`);
        }
    });

    // 5. Carga Horária
    teachers.forEach(t => {
        let actualLoad = 0;
        ['morning', 'afternoon'].forEach(shift => {
            classes.forEach(c => {
                actualLoad += schedule[shift][c].filter(p => p === t.name).length;
            });
        });
        if (actualLoad < t.load) {
            results.workload.passed = false;
            results.workload.details.push(`${t.name}: ${actualLoad}/${t.load}h`);
        }
    });

    results.consecutivas = { passed: true, details: [] };

    // 6. Regras de Aulas Consecutivas Gerais
    for (const turma of classes) {
        teachers.forEach(t => {
            ['morning', 'afternoon'].forEach(shift => {
                let dailyLessons = Array(5).fill(0).map(() => []);
                for (let d = 0; d < 5; d++) {
                    let streak = 0;
                    for (let p = 0; p < 5; p++) {
                        if (schedule[shift][turma][d * 5 + p] === t.name) {
                            streak++;
                            if (streak > 2 && !t.name.includes('/') && t.name !== 'JEFF') {
                                results.consecutivas.passed = false;
                                results.consecutivas.details.push(`${t.name}: >2 seguidas em ${turma} (${days[d]})`);
                            }
                        } else {
                            streak = 0;
                        }
                    }
                }
            });
        });
    }

    // 7. Regras Específicas do ALEXANDRE (Geminadas + Bloqueio p3-p4)
    const alexS = teachers.find(t => t.name === 'ALEXANDRE');
    if (alexS) {
        for (const turma of classes) {
            let alexLessons = [];
            ['morning', 'afternoon'].forEach(shift => {
                for (let d = 0; d < 5; d++) {
                    for (let p = 0; p < 5; p++) {
                        if (schedule[shift][turma][d * 5 + p] === 'ALEXANDRE') {
                            alexLessons.push({ d, p, shift });
                        }
                    }
                }
            });

            // Each turma should have exactly 2 Alexandre lessons (1 pair)
            if (alexLessons.length > 0) {
                if (alexLessons.length !== 2) {
                    results.alexandre.passed = false;
                    results.alexandre.details.push(`Alexandre: ${turma} tem ${alexLessons.length} aulas (esperado: 2 geminadas)`);
                } else {
                    // Sort by time
                    alexLessons.sort((a, b) => {
                        const aTime = (a.shift === 'afternoon' ? 100 : 0) + a.d * 10 + a.p;
                        const bTime = (b.shift === 'afternoon' ? 100 : 0) + b.d * 10 + b.p;
                        return aTime - bTime;
                    });

                    const [L1, L2] = alexLessons;

                    // Check if they are consecutive (INVIOLABLE)
                    const sameDay = L1.d === L2.d;
                    const sameShift = L1.shift === L2.shift;
                    const consecutive = sameDay && sameShift && (L2.p - L1.p) === 1;

                    if (!consecutive) {
                        results.alexandre.passed = false;
                        results.alexandre.details.push(`Alexandre: ${turma} - aulas NÃO geminadas (${days[L1.d]} p${L1.p + 1} ${L1.shift} e ${days[L2.d]} p${L2.p + 1} ${L2.shift})`);
                    }

                    // Check for p3-p4 violation (INVIOLABLE)
                    if (consecutive && L1.p === 2 && L2.p === 3) {
                        results.alexandre.passed = false;
                        results.alexandre.details.push(`Alexandre: ${turma} - par p3-p4 PROIBIDO (${days[L1.d]} ${L1.shift})`);
                    }
                }
            }
        }
    }

    return results;
}
