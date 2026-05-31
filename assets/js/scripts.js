document.addEventListener("DOMContentLoaded", function() {

    const reveals = document.querySelectorAll(".reveal");

    function revealOnScroll() {
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }

 
        const contentWrapper = document.querySelector('.content-wrapper');
        if (contentWrapper) {
            const wrapperTop = contentWrapper.getBoundingClientRect().top;
            if (wrapperTop < window.innerHeight - 100) {
                contentWrapper.classList.add('reveal-plates');
            }
        }


        const clueItems = document.querySelectorAll('.clue-item');
        const redThread = document.querySelector('.red-thread-vertical');
        let anyVisible = false;

        clueItems.forEach((item, idx) => {
            const rect = item.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100 && rect.bottom > 0;
            if (isVisible) {
                item.classList.add('visible');
                item.classList.add('reveal-line');
                anyVisible = true;
            }
        });

        if (redThread && anyVisible && !redThread.classList.contains('animated')) {
            redThread.classList.add('animated');
        }
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();


    document.querySelectorAll('.newspaper-columns .column').forEach((col, idx) => {
        col.style.setProperty('--order', idx);
    });
    document.querySelectorAll('.chat-message').forEach((msg, idx) => {
        msg.style.setProperty('--msg-order', idx);
    });

    window.addEventListener('load', revealOnScroll);

    let clickCount = 0;
    let easterTimer;
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        mainTitle.addEventListener('click', function(e) {
            clickCount++;
            if (clickCount === 5) {
                const egg = document.createElement('div');
                egg.className = 'easter-egg';
                egg.textContent = '🕵️‍♂️ Секретный файл: Алисия до сих пор не раскаялась. Продолжайте расследование...';
                document.body.appendChild(egg);
                setTimeout(() => egg.classList.add('show'), 10);
                setTimeout(() => {
                    egg.classList.remove('show');
                    setTimeout(() => egg.remove(), 500);
                }, 4000);
                clickCount = 0;
                clearTimeout(easterTimer);
                if (window.consoleSimulator) {
                    window.consoleSimulator.addLine("⚠️ Рассекречено: Психика мифомана защищает ложь до конца.");
                }
            } else {
                clearTimeout(easterTimer);
                easterTimer = setTimeout(() => { clickCount = 0; }, 2000);
            }
        });
    }

    (function setupConsole() {
        const consolePanel = document.createElement('div');
        consolePanel.className = 'console-panel collapsed';
        consolePanel.innerHTML = `
            <div class="console-header">
                <span>>_ CONSOLE v1.0</span>
                <span class="console-toggle">▶</span>
            </div>
            <div class="console-content">
                <div class="console-line">Система инициализирована. Добро пожаловать, детектив.</div>
                <div class="console-line">Загружены материалы дела #911-SURVIVOR-FRAUD.</div>
                <div class="console-line">Введите "help" для списка команд.</div>
                <div class="console-input-line">
                    <span>$></span>
                    <input type="text" class="console-input" placeholder="введите команду..." autocomplete="off">
                </div>
            </div>
        `;
        document.body.appendChild(consolePanel);

        const consoleContent = consolePanel.querySelector('.console-content');
        const consoleInput = consolePanel.querySelector('.console-input');
        const toggleBtn = consolePanel.querySelector('.console-toggle');
        const header = consolePanel.querySelector('.console-header');


        function addConsoleLine(text, isError = false) {
            const line = document.createElement('div');
            line.className = 'console-line';
            line.style.color = isError ? '#ff8080' : '#b0ffb0';
            line.innerHTML = text;
            consoleContent.insertBefore(line, consoleContent.querySelector('.console-input-line'));

            consoleContent.scrollTop = consoleContent.scrollHeight;
        }
        window.consoleSimulator = { addLine: addConsoleLine };



    const commands = {
        help: () => {
            addConsoleLine("Доступные команды:");
            addConsoleLine("  clues       - все улики дела");
            addConsoleLine("  timeline    - полная хронология");
            addConsoleLine("  suspect     - развёрнутый профиль");
            addConsoleLine("  case_file   - выдержки из NYT");
            addConsoleLine("  truth       - психологический мотив");
            addConsoleLine("  shadow      - ???");
            addConsoleLine("  clear       - очистить консоль");
            addConsoleLine("  logout      - свернуть консоль");
        },
        clues: () => {
            addConsoleLine("УЛИКИ ПО ДЕЛУ:");
            addConsoleLine("  [1] Нет трудового договора с Merrill Lynch — офиса в башне не существовало.");
            addConsoleLine("  [2] Фантомный жених Дейв: семья о нём не слышала, детский фонд не зарегистрирован.");
            addConsoleLine("  [3] Невозможный обзор самолёта из окна — планировка здания исключает это.");
            addConsoleLine("  [4] Шрам не от ожога, а от автоаварии (заключение экспертов).");
            addConsoleLine("  [5] 11 сентября 2001 Алисия сдавала экзамен в бизнес-школе ESADE (Барселона).");
            addConsoleLine("  [6] Ни одна больница не подтверждает 6-дневное лечение в ожоговом отделении.");
            addConsoleLine("  [7] Выдуманный спасатель Уэллс Кроутер — Таня присвоила его подвиг через 5 лет.");
            addConsoleLine("  [8] Постоянные противоречия в показаниях (меняла число выживших, этажи, детали).");
            addConsoleLine("  [9] Патологическая мифомания — подтверждена психологами, работавшими с сетью.");
            addConsoleLine("  [10] Отсутствие материальной выгоды — бескорыстная ложь (нарциссическая мотивация).");
        },
        timeline: () => {
            addConsoleLine("ХРОНОЛОГИЯ РАССЛЕДОВАНИЯ:");
            addConsoleLine("  2001  - 11 сентября: теракт. Алисия в Барселоне.");
            addConsoleLine("  2004  - Таня Хэд вступает в сеть выживших WTC Survivors' Network.");
            addConsoleLine("  2005  - Паническая атака во время дебатов с мэром Джулиани. Первые сомнения Джерри.");
            addConsoleLine("  2006  - Статья в NY Daily News с новым героем (Уэллс). Журналисты NYT начинают проверку.");
            addConsoleLine("  2007  - 27 сентября: The New York Times публикует разоблачение. Таня бежит в Испанию.");
            addConsoleLine("  2008  - Ложное сообщение о смерти Тани с неизвестного аккаунта.");
            addConsoleLine("  2010  - Документальный фильм 'Женщина, которой там не было'.");
            addConsoleLine("  н.в.  - Местонахождение неизвестно. Последние данные: работа в Канаде как бизнес-консультант.");
        },
        suspect: () => {
            addConsoleLine("ПРОФИЛЬ: Алисия Эстеве Хэд (Таня Хэд)");
            addConsoleLine("  • Гражданка Испании, аристократическая семья (отец и брат сидели за фин. скандал).");
            addConsoleLine("  • Образование: Барселонский университет, бизнес-школа ESADE.");
            addConsoleLine("  • Диагноз (неофициально): патологическая лживость, нарциссическое расстройство.");
            addConsoleLine("  • Мотив: жажда признания, роль 'святой жертвы', власть в сообществе.");
            addConsoleLine("  • Статус: в розыске (психологическом) — никогда не извинилась, исчезла.");
            addConsoleLine("  • Цитата из NYT: 'Она не брала денег, но украла доверие и горе.'");
        },
        case_file: () => {
            addConsoleLine("ВЫДЕРЖКИ ИЗ СТАТЬИ NEW YORK TIMES (27.09.2007):");
            addConsoleLine("  'Госпожа Хэд, известная как Таня Хэд, создала легенду о себе, которой жила 6 лет.'");
            addConsoleLine("  'Она утверждала, что потеряла жениха, но мужчина, которого она назвала, был жив и никогда о ней не слышал.'");
            addConsoleLine("  'Её шрам — не ожог, а след от ДТП в Барселоне за два года до теракта.'");
            addConsoleLine("  'Члены сети выживших чувствуют себя преданными, но благодарят за реальную помощь.'");
            addConsoleLine("  'Никто не знает, где сейчас Алисия. Она отказалась от интервью.'");
        },
        truth: () => {
            addConsoleLine("ПСИХОЛОГИЧЕСКИЙ МОТИВ (версия экспертов):");
            addConsoleLine("  • Компенсация семейного позора (отец и брат — уголовники).");
            addConsoleLine("  • Жажда быть 'идеальной жертвой' — нарциссическая подпитка.");
            addConsoleLine("  • Бегство от реальности: создание альтер-эго 'Таня Хэд' как способ выжить.");
            addConsoleLine("  • Отсутствие корысти подтверждает: ей нужна была не выгода, а любовь и признание.");
            addConsoleLine("  • Мифомания: ложь становится автоматической, грань между правдой и вымыслом стёрта.");
        },
        shadow: () => {
            addConsoleLine("  Хотите узнать больше? Попробуйте кликнуть на слово 'Черемша' в тексте...");
        },
        clear: () => { /* оставляем */ },
        logout: () => { /* оставляем */ }
    };

   
        function processCommand(cmd) {
            const lower = cmd.trim().toLowerCase();
            if (lower === "") return;
            addConsoleLine(`> ${cmd}`);
            if (commands[lower]) {
                commands[lower]();
            } else {
                addConsoleLine(`Неизвестная команда: "${cmd}". Введите "help" для списка.`, true);
            }
            consoleInput.value = "";
        }

        consoleInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                processCommand(consoleInput.value);
            }
        });

       
        let isCollapsed = true;
        function toggleConsole() {
            if (isCollapsed) {
                consolePanel.classList.remove('collapsed');
                toggleBtn.textContent = '▼';
                isCollapsed = false;
                consoleInput.focus();
            } else {
                consolePanel.classList.add('collapsed');
                toggleBtn.textContent = '▶';
                isCollapsed = true;
            }
        }
        header.addEventListener('click', toggleConsole);

        
        addConsoleLine("Консоль готова. Для команд введите 'help'.");
    })();

    
    const board = document.getElementById('investigationBoard');
    if (board) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelectorAll('.clue-item').forEach((item, i) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                            item.classList.add('reveal-line');
                        }, i * 120);
                    });
                    observer.unobserve(board);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(board);
    }

   
    const eggStyle = document.createElement('style');
    eggStyle.textContent = `
        .easter-egg {
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: #1a1f2a;
            color: var(--accent-red);
            padding: 8px 16px;
            border-radius: 40px;
            font-size: 0.8rem;
            z-index: 2000;
            opacity: 0;
            transition: opacity 0.3s;
            pointer-events: none;
            font-family: monospace;
            border-left: 3px solid var(--accent-red);
            box-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }
        .easter-egg.show {
            opacity: 1;
        }
    `;
    document.head.appendChild(eggStyle);



    function addSecretConsoleCommand() {
        if (window.consoleSimulator && window.consoleSimulator.addCommand) {
            window.consoleSimulator.addCommand("show_cheremcha", () => {
                window.showCheremchaPhoto();
            });
        } else {
            
            setTimeout(addSecretConsoleCommand, 100);
        }
    }
    
  
    window.showCheremchaPhoto = function() {
       
        const oldModal = document.querySelector('.easter-modal');
        if (oldModal) oldModal.remove();
        
        const modal = document.createElement('div');
        modal.className = 'easter-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>СЕКРЕТНЫЙ ФАЙЛ РАСКРЫТ</h3>
                <div class="photo-placeholder" style="max-width: 300px; margin: 0 auto;">
                    <img src="/assets/images/ч.jpg" alt="Черемша" style="max-width:100%; border-radius: 8px;">
                    <div class="photo-caption">"Черемша" — легендарный персонаж, заснятый в момент расследования</div>
                </div>
                <p style="font-size: 1.0rem; font-style: italic;">На самом деле в СССР не было никакой Черемши. Или была? 🤔</p>
                <button class="modal-close">Закрыть дело</button>
            </div>
        `;
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 10);
        
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        });
        
        
        if (window.consoleSimulator) {
            window.consoleSimulator.addLine("⚠️ Рассекречено: фото Черемши добавлено. Следствие в замешательстве.");
        }
    };
    

    function findAndAddClickableEasterEgg() {
       
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    if (node.parentElement && 
                        (node.parentElement.tagName === 'SCRIPT' || 
                         node.parentElement.tagName === 'STYLE' ||
                         node.parentElement.classList?.contains('console-content'))) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    if (node.textContent && /Черемш/gi.test(node.textContent)) {
                        return NodeFilter.FILTER_ACCEPT;
                    }
                    return NodeFilter.FILTER_SKIP;
                }
            }
        );
        
        const nodesToReplace = [];
        while (walker.nextNode()) {
            nodesToReplace.push(walker.currentNode);
        }
        
        nodesToReplace.forEach(node => {
            const text = node.textContent;
            const replaced = text.replace(/(Черемш[а-я]*)/gi, match => {
                return `<span class="easter-clickable" data-original="${match}">${match}</span>`;
            });
            const span = document.createElement('span');
            span.innerHTML = replaced;
            node.parentNode.replaceChild(span, node);
        });
        
    
        const style = document.createElement('style');
        style.textContent = `
            .easter-clickable {
                cursor: pointer;
                border-bottom: 1px dashed var(--accent-red);
                transition: all 0.2s;
                background: rgba(181,43,43,0.1);
                padding: 0 2px;
                border-radius: 4px;
            }
            .easter-clickable:hover {
                background: rgba(181,43,43,0.3);
                text-shadow: 0 0 2px var(--accent-red);
            }
        `;
        document.head.appendChild(style);
        

        document.querySelectorAll('.easter-clickable').forEach(el => {
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                window.showCheremchaPhoto();
                if (window.consoleSimulator) {
                    window.consoleSimulator.addLine(`🔍 Вы кликнули на "${el.dataset.original || el.textContent}". Секретная папка открыта.`);
                }
            });
        });
    }
    

    let konamiIndex = 0;
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'Enter', 'Enter'];
    document.addEventListener('keydown', (e) => {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
        
                if (window.consoleSimulator) {
                    window.consoleSimulator.addLine("🎮 КОД КОНАМИ (БЕЗ БУКВ) АКТИВИРОВАН! Секретный архив открыт.");
                    window.consoleSimulator.addLine("📁 Команда 'show_cheremcha' уже доступна, но мы показали фото отдельно.");
                }
                window.showCheremchaPhoto(); 
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    setTimeout(() => {
        if (window.consoleSimulator && !window.consoleSimulator.addCommand) {
     
            window.consoleSimulator.addCommand = (cmd, fn) => {
                const originalCommands = window.consoleSimulator.commands || {};
                originalCommands[cmd] = fn;
                window.consoleSimulator.commands = originalCommands;

                if (window._consoleCommands) {
                    window._consoleCommands[cmd] = fn;
                } else {
                   
                }
            };
        }
        

        const consolePanel = document.querySelector('.console-panel');
        if (consolePanel && consolePanel._commands) {
            consolePanel._commands['show_cheremcha'] = window.showCheremchaPhoto;
        } else if (window._consoleCommands) {
            window._consoleCommands['show_cheremcha'] = window.showCheremchaPhoto;
        } else {
            window._consoleCommands = { 'show_cheremcha': window.showCheremchaPhoto };
            const originalAddLine = window.consoleSimulator?.addLine;
            const consoleInput = document.querySelector('.console-input');
            if (consoleInput) {
                const originalHandler = consoleInput.getEventListeners && consoleInput.getEventListeners('keypress');
                consoleInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        const value = consoleInput.value.trim().toLowerCase();
                        if (value === 'show_cheremcha') {
                            e.stopImmediatePropagation();
                            window.showCheremchaPhoto();
                            if (window.consoleSimulator) window.consoleSimulator.addLine(`> ${value}`);
                            consoleInput.value = '';
                            return;
                        }
                    }
                }, true); 
            }
        }
    }, 200);
    

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', findAndAddClickableEasterEgg);
    } else {
        findAndAddClickableEasterEgg();
    }

    

    
});