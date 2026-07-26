
        // Connection Status Functions
        let apiCallCount = 0;
        
        function setStatusOnline() {
            const el = document.getElementById('connection-status');
            if (el) {
                el.innerHTML = '<i class="fas fa-globe" style="color:#00ff00;"></i> <span style="color:#00ff00;font-weight:bold;">Online</span>';
                el.style.animation = 'pulse 1s infinite';
            }
        }
        
        function setStatusOffline() {
            const el = document.getElementById('connection-status');
            if (el) {
                el.innerHTML = '<i class="fas fa-lock"></i> Offline';
                el.style.animation = 'none';
            }
        }
        
        // Note: Fetch wrapper moved to API Status section below (line ~1270)
        
        // Add pulse animation
        const style = document.createElement('style');
        style.textContent = '@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} } #connection-status{transition:all 0.3s ease}';
        document.head.appendChild(style);

        let TOOLS_DATA = [];
        let currentToolId = null;

        document.addEventListener('DOMContentLoaded', function() {
            // Load tools from JSON
            const dataEl = document.getElementById('tools-data');
            if (dataEl) {
                try {
                    TOOLS_DATA = JSON.parse(dataEl.textContent);
                    console.log('Loaded ' + TOOLS_DATA.length + ' tools');
                    renderCards(TOOLS_DATA);
                } catch(e) {
                    console.error('Error loading tools:', e);
                }
            }
        });

        
        // PROFESSIONAL SVG ICON SYSTEM
        const _PRO_ICON_MAP = {"0": "key-modern", "1": "key", "2": "address-hex", "3": "address", "4": "address-hex", "5": "key-modern", "6": "search", "7": "address-hex", "8": "key", "9": "key", "10": "key", "11": "shield-virus", "12": "key", "13": "code", "14": "layers", "15": "random", "16": "key", "17": "puzzle", "18": "transaction", "19": "wallet", "20": "radar", "21": "chart", "22": "search", "23": "signature", "24": "eye", "25": "binary", "26": "code", "27": "layers", "28": "rotate", "29": "shield-virus", "30": "key", "31": "search", "32": "shield-virus", "33": "puzzle", "34": "hashtag", "35": "chart", "36": "wallet", "37": "blockchain", "38": "radar", "39": "cloud", "40": "eyedropper", "41": "transaction", "42": "chart", "43": "layers", "44": "puzzle", "45": "code", "46": "address", "47": "binary", "48": "curve", "49": "calculator", "50": "curve", "51": "binary", "52": "code", "53": "calculator", "54": "curve", "55": "binary", "56": "radar"};
        const _PRO_SVG_ICONS = {"key": "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M21 8L19 10L14 5L16 3C16.5 2.5 17.5 2.5 18 3L21 6C21.5 6.5 21.5 7.5 21 8Z\" fill=\"currentColor\"/><path d=\"M13 6L4 15L3 21L9 20L18 11L13 6Z\" fill=\"currentColor\" opacity=\"0.85\"/><circle cx=\"7\" cy=\"17\" r=\"1.5\" fill=\"white\"/></svg>", "key-modern": "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"2\" y=\"9\" width=\"18\" height=\"12\" rx=\"2\" fill=\"currentColor\"/><path d=\"M7 9V6C7 3.79 8.79 2 11 2C13.21 2 15 3.79 15 6V9\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><circle cx=\"11\" cy=\"15\" r=\"2\" fill=\"white\"/></svg>", "address": "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z\" fill=\"currentColor\"/><circle cx=\"12\" cy=\"9\" r=\"3\" fill=\"white\"/></svg>", "address-hex": "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 2L3 7V17L12 22L21 17V7L12 2Z\" fill=\"currentColor\" opacity=\"0.9\"/><path d=\"M12 6L7 9V15L12 18L17 15V9L12 6Z\" fill=\"white\" opacity=\"0.3\"/></svg>", "wallet": "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"2\" y=\"6\" width=\"20\" height=\"14\" rx=\"2\" fill=\"currentColor\"/><path d=\"M2 10H22\" stroke=\"white\" stroke-width=\"1.5\" opacity=\"0.3\"/><rect x=\"16\" y=\"13\" width=\"4\" height=\"3\" rx=\"1\" fill=\"white\" opacity=\"0.5\"/></svg>", "transaction": "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" fill=\"currentColor\"/><line x1=\"7\" y1=\"8\" x2=\"17\" y2=\"8\" stroke=\"white\" stroke-width=\"1.5\" opacity=\"0.5\"/><line x1=\"7\" y1=\"12\" x2=\"15\" y2=\"12\" stroke=\"white\" stroke-width=\"1.5\" opacity=\"0.5\"/><circle cx=\"18\" cy=\"17\" r=\"3\" fill=\"#22b573\"/><path d=\"M17 17L18 18L20 16\" stroke=\"white\" stroke-width=\"1.5\" fill=\"none\"/></svg>", "blockchain": "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"2\" y=\"9\" width=\"6\" height=\"6\" rx=\"1\" fill=\"currentColor\"/><rect x=\"9\" y=\"3\" width=\"6\" height=\"6\" rx=\"1\" fill=\"currentColor\" opacity=\"0.8\"/><rect x=\"9\" y=\"15\" width=\"6\" height=\"6\" rx=\"1\" fill=\"currentColor\" opacity=\"0.8\"/><rect x=\"16\" y=\"9\" width=\"6\" height=\"6\" rx=\"1\" fill=\"currentColor\"/><path d=\"M8 12H9M15 12H16M12 9V12V15\" stroke=\"currentColor\" stroke-width=\"1.5\"/></svg>", "search": "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"10\" cy=\"10\" r=\"7\" stroke=\"currentColor\" stroke-width=\"2.5\" fill=\"none\"/><line x1=\"15\" y1=\"15\" x2=\"21\" y2=\"21\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\"/></svg>", "analysis": "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"2\" y=\"14\" width=\"4\" height=\"8\" rx=\"1\" fill=\"currentColor\" opacity=\"0.5\"/><rect x=\"8\" y=\"10\" width=\"4\" height=\"12\" rx=\"1\" fill=\"currentColor\" opacity=\"0.7\"/><rect x=\"14\" y=\"5\" width=\"4\" height=\"17\" rx=\"1\" fill=\"currentColor\"/><rect x=\"20\" y=\"2\" width=\"2\" height=\"20\" rx=\"1\" fill=\"currentColor\" opacity=\"0.8\"/></svg>", "shield": "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 2L4 6V11C4 16.55 7.4 21.74 12 23C16.6 21.74 20 16.55 20 11V6L12 2Z\" fill=\"currentColor\"/><path d=\"M10 12L12 14L15 10\" stroke=\"white\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>", "shield-virus": "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 2L4 6V11C4 16.55 7.4 21.74 12 23C16.6 21.74 20 16.55 20 11V6L12 2Z\" fill=\"currentColor\"/><circle cx=\"12\" cy=\"13\" r=\"3\" fill=\"white\" opacity=\"0.3\"/><circle cx=\"12\" cy=\"13\" r=\"1.5\" fill=\"white\"/><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"10\" stroke=\"white\" stroke-width=\"1\"/><line x1=\"12\" y1=\"16\" x2=\"12\" y2=\"18\" stroke=\"white\" stroke-width=\"1\"/><line x1=\"8\" y1=\"13\" x2=\"10\" y2=\"13\" stroke=\"white\" stroke-width=\"1\"/><line x1=\"14\" y1=\"13\" x2=\"16\" y2=\"13\" stroke=\"white\" stroke-width=\"1\"/></svg>", "code": "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" fill=\"currentColor\"/><path d=\"M8 10L5 12L8 14\" stroke=\"white\" stroke-width=\"1.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M16 10L19 12L16 14\" stroke=\"white\" stroke-width=\"1.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><line x1=\"13\" y1=\"8\" x2=\"11\" y2=\"16\" stroke=\"white\" stroke-width=\"1.5\" stroke-linecap=\"round\"/></svg>", "binary": "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2\" fill=\"currentColor\"/><text x=\"6\" y=\"14\" font-family=\"monospace\" font-size=\"8\" fill=\"white\" font-weight=\"bold\">01</text><text x=\"6\" y=\"18\" font-family=\"monospace\" font-size=\"6\" fill=\"white\" opacity=\"0.4\">1011</text></svg>", "calculator": "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"4\" y=\"2\" width=\"16\" height=\"20\" rx=\"2\" fill=\"currentColor\"/><rect x=\"6\" y=\"4\" width=\"12\" height=\"5\" rx=\"1\" fill=\"white\" opacity=\"0.3\"/><circle cx=\"8\" cy=\"12\" r=\"1.2\" fill=\"white\"/><circle cx=\"12\" cy=\"12\" r=\"1.2\" fill=\"white\"/><circle cx=\"16\" cy=\"12\" r=\"1.2\" fill=\"white\"/><circle cx=\"8\" cy=\"16\" r=\"1.2\" fill=\"white\"/><circle cx=\"12\" cy=\"16\" r=\"1.2\" fill=\"white\"/><circle cx=\"16\" cy=\"16\" r=\"1.2\" fill=\"white\"/><rect x=\"14\" y=\"18\" width=\"4\" height=\"3\" rx=\"0.5\" fill=\"#22b573\"/></svg>", "curve": "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M2 20Q6 4 12 12T22 8\" stroke=\"currentColor\" stroke-width=\"2.5\" fill=\"none\" stroke-linecap=\"round\"/><circle cx=\"6\" cy=\"8\" r=\"2\" fill=\"currentColor\" opacity=\"0.3\"/><circle cx=\"12\" cy=\"12\" r=\"2\" fill=\"currentColor\" opacity=\"0.6\"/><circle cx=\"18\" cy=\"10\" r=\"2\" fill=\"currentColor\"/></svg>", "signature": "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M3 17L7 13C8 12 9 13 10 14C11 15 12 16 13 14C14 12 15 8 17 8C19 8 20 11 21 11\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/><line x1=\"3\" y1=\"20\" x2=\"21\" y2=\"20\" stroke=\"currentColor\" stroke-width=\"1.5\" opacity=\"0.3\"/></svg>", "random": "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" fill=\"currentColor\" opacity=\"0.8\"/><circle cx=\"8\" cy=\"8\" r=\"2\" fill=\"white\" opacity=\"0.5\"/><circle cx=\"16\" cy=\"10\" r=\"2\" fill=\"white\" opacity=\"0.7\"/><circle cx=\"11\" cy=\"15\" r=\"2.5\" fill=\"white\"/><circle cx=\"17\" cy=\"17\" r=\"1.5\" fill=\"white\" opacity=\"0.6\"/></svg>", "layers": "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 2L2 7L12 12L22 7L12 2Z\" fill=\"currentColor\"/><path d=\"M2 12L12 17L22 12\" stroke=\"currentColor\" stroke-width=\"2\" opacity=\"0.6\" fill=\"none\"/><path d=\"M2 17L12 22L22 17\" stroke=\"currentColor\" stroke-width=\"2\" opacity=\"0.3\" fill=\"none\"/></svg>", "puzzle": "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"7\" y=\"7\" width=\"10\" height=\"10\" rx=\"2\" fill=\"currentColor\" opacity=\"0.3\"/><path d=\"M19 13H15C14.45 13 14 12.55 14 12C14 11.45 14.45 11 15 11H19C19.55 11 20 11.45 20 12C20 12.55 19.55 13 19 13Z\" fill=\"currentColor\"/><path d=\"M13 9V5C13 4.45 12.55 4 12 4C11.45 4 11 4.45 11 5V9C11 9.55 11.45 10 12 10C12.55 10 13 9.55 13 9Z\" fill=\"currentColor\"/><path d=\"M9 15V19C9 19.55 9.45 20 10 20C10.55 20 11 19.55 11 19V15C11 14.45 10.55 14 10 14C9.45 14 9 14.45 9 15Z\" fill=\"currentColor\"/><path d=\"M5 13H9C9.55 13 10 12.55 10 12C10 11.45 9.55 11 9 11H5C4.45 11 4 11.45 4 12C4 12.55 4.45 13 5 13Z\" fill=\"currentColor\"/></svg>", "eye": "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5Z\" fill=\"currentColor\" opacity=\"0.3\"/><circle cx=\"12\" cy=\"12\" r=\"4\" fill=\"currentColor\"/><circle cx=\"12\" cy=\"12\" r=\"1.5\" fill=\"white\"/></svg>", "rotate": "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4 12C4 7.58 7.58 4 12 4C14.5 4 16.74 5.18 18.17 7.02L16 9.17V3H22.17L19.83 5.34C17.95 3.03 15.16 1.5 12 1.5C6.47 1.5 2 5.97 2 11.5\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/><path d=\"M20 12C20 16.42 16.42 20 12 20C9.5 20 7.26 18.82 5.83 16.98L8 13.83V20H1.83L4.17 17.66C6.05 20.97 8.84 22.5 12 22.5C17.53 22.5 22 18.03 22 12.5\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\" opacity=\"0.5\"/></svg>", "hashtag": "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><line x1=\"4\" y1=\"9\" x2=\"20\" y2=\"9\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"4\" y1=\"15\" x2=\"20\" y2=\"15\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"10\" y1=\"3\" x2=\"8\" y2=\"21\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"16\" y1=\"3\" x2=\"14\" y2=\"21\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\"/></svg>", "radar": "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"12\" cy=\"12\" r=\"10\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\" opacity=\"0.3\"/><circle cx=\"12\" cy=\"12\" r=\"6\" stroke=\"currentColor\" stroke-width=\"1.5\" fill=\"none\" opacity=\"0.5\"/><circle cx=\"12\" cy=\"12\" r=\"2\" fill=\"currentColor\"/><line x1=\"12\" y1=\"12\" x2=\"18\" y2=\"6\" stroke=\"currentColor\" stroke-width=\"1.5\" opacity=\"0.7\"/></svg>", "chart": "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"3\" y=\"14\" width=\"4\" height=\"7\" rx=\"1\" fill=\"currentColor\" opacity=\"0.5\"/><rect x=\"9\" y=\"10\" width=\"4\" height=\"11\" rx=\"1\" fill=\"currentColor\" opacity=\"0.7\"/><rect x=\"15\" y=\"6\" width=\"4\" height=\"15\" rx=\"1\" fill=\"currentColor\"/><path d=\"M3 4L21 4\" stroke=\"currentColor\" stroke-width=\"1.5\" opacity=\"0.2\"/></svg>", "cloud": "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M18 10C17.4 6.3 14.1 3.5 10.2 3.5C6.1 3.5 2.7 6.6 2 10.6C2 10.7 2 10.9 2 11C2 13.2 3.8 15 6 15H18C20.2 15 22 13.2 22 11C22 9.1 20.4 7.5 18.3 7.5\" fill=\"currentColor\" opacity=\"0.7\"/><ellipse cx=\"9\" cy=\"12\" rx=\"4\" ry=\"2.5\" fill=\"currentColor\" opacity=\"0.4\"/><ellipse cx=\"15\" cy=\"13\" rx=\"5\" ry=\"3\" fill=\"currentColor\"/></svg>", "eyedropper": "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20.71 5.63L18.37 3.29C17.59 2.51 16.33 2.51 15.54 3.29L13 5.79L11.71 4.5C11.32 4.11 10.68 4.11 10.29 4.5L9 5.79L14.21 11L15.5 9.71C15.89 9.32 15.89 8.68 15.5 8.29L14.21 7L16.71 4.5L19.09 6.88L20.71 5.63Z\" fill=\"currentColor\"/><path d=\"M13.04 12.17L7.88 7L6.59 8.29C6.2 8.68 6.2 9.32 6.59 9.71L7.88 11L5.41 13.46L4.22 12.27C3.83 11.88 3.2 11.88 2.81 12.27L1.5 13.56L6.91 18.97L8.2 17.68C8.59 17.29 8.59 16.65 8.2 16.26L7 15.07L9.47 12.6L10.76 13.89C11.15 14.28 11.79 14.28 12.18 13.89L13.47 12.6L13.04 12.17Z\" fill=\"currentColor\" opacity=\"0.8\"/></svg>"};
        
        // REAL IMAGE ICON SYSTEM (Professional 3D Icons like privatekeyfinder.io)
        
        
        
        // UNIQUE ICON SYSTEM - Every Tool Looks Different!
        
        const _UNIQUE_STYLE_DATA = {"0":{"accent":"#FFD700","effect":"glow-gold"},"1":{"accent":"#1E90FF","effect":"pulse-blue"},"2":{"accent":"#9B59B6","effect":"shift-purple"},"3":{"accent":"#00BCD4","effect":"grid-cyan"},"4":{"accent":"#27AE60","effect":"morph"},"5":{"accent":"#E67E22","effect":"shine-orange"},"6":{"accent":"#00CED1","effect":"float"},"7":{"accent":"#8E44AD","effect":"rotate-right"},"8":{"accent":"#E74C3C","effect":"flip-x"},"9":{"accent":"#2ECC71","effect":"flip-y"},"10":{"accent":"#F39C12","effect":"puzzle-glow"},"11":{"accent":"#C0392B","effect":"alert-pulse"},"12":{"accent":"#3498DB","effect":"cross-fade"},"13":{"accent":"#16A085","effect":"code-rain"},"14":{"accent":"#27AE60","effect":"grow"},"15":{"accent":"#E91E63","effect":"brain-pulse"},"16":{"accent":"#FF9800","effect":"zoom-in"},"17":{"accent":"#00BCD4","effect":"merge"},"18":{"accent":"#34495E","effect":"parse"},"19":{"accent":"#795548","effect":"stamp"},"20":{"accent":"#00E676","effect":"radar-scan"},"21":{"accent":"#FFD700","effect":"weigh"},"22":{"accent":"#607D8B","effect":"timeline"},"23":{"accent":"#673AB7","effect":"sign"},"24":{"accent":"#2196F3","effect":"inspect"},"25":{"accent":"#FF5722","effect":"transform"},"26":{"accent":"#009688","effect":"alphabet"},"27":{"accent":"#9C27B0","effect":"funnel"},"28":{"accent":"#FF00FF","effect":"rainbow"},"29":{"accent":"#F44336","effect":"warning"},"30":{"accent":"#B71C1C","effect":"attack"},"31":{"accent":"#4CAF50","effect":"analyze"},"32":{"accent":"#FF9800","effect":"dice"},"33":{"accent":"#E040FB","effect":"glitch"},"34":{"accent":"#FFD700","effect":"trophy"},"35":{"accent":"#4CAF50","effect":"chart-up"},"36":{"accent":"#1E88E5","effect":"track"},"37":{"accent":"#673AB7","effect":"explore"},"38":{"accent":"#D32F2F","effect":"detective"},"39":{"accent":"#FFA000","effect":"mine"},"40":{"accent":"#00BCD4","effect":"pool"},"41":{"accent":"#FFD700","effect":"treasure"},"42":{"accent":"#4CAF50","effect":"speedometer"},"43":{"accent":"#2196F3","effect":"convert"},"44":{"accent":"#FF9800","effect":"construct"},"45":{"accent":"#9C27B0","effect":"broadcast"},"46":{"accent":"#00E676","effect":"push"},"47":{"accent":"#00BCD4","effect":"extract"},"48":{"accent":"#3F51B5","effect":"calculate"},"49":{"accent":"#7B1FA2","effect":"inverse"},"50":{"accent":"#E91E63","effect":"multiply"},"51":{"accent":"#FF5722","effect":"multi"},"52":{"accent":"#009688","effect":"checksum"},"53":{"accent":"#303F9F","effect":"crypto"},"54":{"accent":"#C2185B","effect":"point"},"55":{"accent":"#FF6D00","effect":"hub"},"56":{"accent":"#D50000","effect":"deep-scan"}};
        
        function getUniqueToolIcon(toolId) {
            const imgData = (typeof _UNIQUE_IMG_DATA !== 'undefined' ? _UNIQUE_IMG_DATA : {})[toolId] || (typeof _UNIQUE_IMG_DATA !== 'undefined' ? _UNIQUE_IMG_DATA : {})['0'];
            const styleData = _UNIQUE_STYLE_DATA[toolId] || _UNIQUE_STYLE_DATA['0'];
            return '<div class="tool-icon-unique" data-accent="' + styleData.accent + '" data-effect="' + styleData.effect + '">' +
                   '<img src="' + imgData + '" alt="Tool ' + toolId + '" loading="lazy">' +
                   '</div>';
        }



function renderCards(tools) {
            const grid = document.getElementById('cardGrid');
            if (!grid) return;
            grid.innerHTML = '';
            
            tools.forEach(function(tool) {
                const card = document.createElement('div');
                card.className = 'card';
                card.setAttribute('data-category', tool.category.toLowerCase());
                card.setAttribute('data-search', (tool.title + ' ' + tool.description).toLowerCase());
                card.setAttribute('data-tool-id', tool.id);
                
                card.onclick = function() { openTool(tool.id); };
                
                // Check if this tool has cached results
                const hasCachedState = ToolStateCache[tool.id] !== undefined;
                const cachedIndicator = hasCachedState ? 
                    '<span style="position:absolute;top:8px;right:8px;background:#00ff88;color:#000;font-size:8px;padding:2px 6px;border-radius:10px;font-weight:bold;">● CACHED</span>' : 
                    '';
                
                card.style.position = 'relative';
                
                card.innerHTML = 
                    cachedIndicator +
                    getUniqueToolIcon(tool.id) +
                    '<div class="card-title">' + tool.title + '</div>' +
                    '<div class="card-desc">' + (tool.description || 'Click to open...') + '</div>' +
                    '<span class="card-badge badge-' + tool.color + '">' + tool.category + '</span>' +
                    '<i class="fas fa-arrow-right card-arrow"></i>';
                
                grid.appendChild(card);
            });
        }
        
        // Function to refresh/re-render cards (call after state changes)
        function refreshCardIndicators() {
            if (typeof TOOLS_DATA !== 'undefined' && TOOLS_DATA.length > 0) {
                renderCards(TOOLS_DATA);
            }
        }

        // ===== TOOL STATE PRESERVATION SYSTEM =====
        // Stores results for each tool so they persist when navigating between tools
        let ToolStateCache = {};  // { toolId: { html: "...", inputs: {...}, timestamp: ..., scrollY: ... } }
        let LastViewedToolId = null;  // Track which tool was last viewed
        
        function saveToolState(toolId, resultHtml) {
            if (!ToolStateCache[toolId]) {
                ToolStateCache[toolId] = {};
            }
            
            // Save the current HTML content (results)
            const toolContent = document.getElementById('toolContent');
            if (toolContent) {
                ToolStateCache[toolId].html = toolContent.innerHTML;
                ToolStateCache[toolId].timestamp = Date.now();
                
                // ★ SAVE SCROLL POSITION - so user returns to same spot
                ToolStateCache[toolId].scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
                
                // Also save input values if any exist in this tool's form
                const inputs = toolContent.querySelectorAll('input, textarea, select');
                ToolStateCache[toolId].inputs = {};
                inputs.forEach(function(input) {
                    if (input.id || input.name) {
                        const key = input.id || input.name;
                        ToolStateCache[toolId].inputs[key] = {
                            value: input.value,
                            type: input.type,
                            checked: input.checked
                        };
                    }
                });
                
                console.log(`[STATE] Saved state for Tool #${toolId} (scroll: ${ToolStateCache[toolId].scrollY}px)`);
                
                // Refresh card indicators to show "CACHED" badge
                refreshCardIndicators();
            }
        }
        
        function restoreToolState(toolId) {
            if (!ToolStateCache[toolId]) {
                return false;  // No saved state
            }
            
            const saved = ToolStateCache[toolId];
            const toolContent = document.getElementById('toolContent');
            
            if (toolContent && saved.html) {
                // Restore the full HTML (including results)
                toolContent.innerHTML = saved.html;
                
                // Restore input values
                if (saved.inputs) {
                    Object.keys(saved.inputs).forEach(function(key) {
                        const input = document.getElementById(key) || document.querySelector(`[name="${key}"]`);
                        if (input) {
                            input.value = saved.inputs[key].value;
                            if (saved.inputs[key].type === 'checkbox' || saved.inputs[key].type === 'radio') {
                                input.checked = saved.inputs[key].checked;
                            }
                        }
                    });
                }
                
                // ★ RESTORE SCROLL POSITION - user returns to same spot they were at!
                if (saved.scrollY && saved.scrollY > 0) {
                    setTimeout(function() {
                        window.scrollTo({ top: saved.scrollY, behavior: 'instant' });
                        console.log(`[STATE] Restored scroll to ${saved.scrollY}px for Tool #${toolId}`);
                    }, 50);  // Small delay to allow DOM to render first
                }
                
                console.log(`[STATE] Restored state for Tool #${toolId} (saved ${Math.round((Date.now() - saved.timestamp)/1000)}s ago, scroll: ${saved.scrollY}px)`);
                return true;
            }
            return false;
        }
        
        function clearToolState(toolId) {
            delete ToolStateCache[toolId];
            console.log(`[STATE] Cleared state for Tool #${toolId}`);
            // Refresh card indicators to remove "CACHED" badge
            refreshCardIndicators();
        }
        
        function clearAllToolStates() {
            ToolStateCache = {};
            console.log('[STATE] Cleared all tool states');
            // Refresh card indicators
            refreshCardIndicators();
        }
        
        // Reset current tool and reload fresh content
        function resetCurrentTool() {
            if (currentToolId !== null) {
                clearToolState(currentToolId);
                // Re-open the tool with fresh content
                const tool = TOOLS_DATA.find(function(t) { return t.id === currentToolId; });
                if (tool) {
                    document.getElementById('toolContent').innerHTML = '<div class="tool-card">' + tool.content + '</div>';
                    document.getElementById('toolViewTitle').innerHTML = tool.title + ' <small>' + tool.category + ' Tool</small>';
                    console.log(`[STATE] Reset Tool #${currentToolId} to fresh state`);
                }
            }
        }
        
        // ★ CONTINUOUS SCROLL TRACKING - saves scroll position as user scrolls
        let ScrollSaveTimeout = null;
        window.addEventListener('scroll', function() {
            // Only track when viewing a tool (not on home page)
            if (currentToolId !== null && ToolStateCache[currentToolId]) {
                // Debounce - don't save on every pixel, wait 300ms after scrolling stops
                if (ScrollSaveTimeout) clearTimeout(ScrollSaveTimeout);
                ScrollSaveTimeout = setTimeout(function() {
                    ToolStateCache[currentToolId].scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
                    // Don't log every save to avoid console spam
                }, 300);
            }
        }, { passive: true });

        function openTool(id) {
            // Auto-save current tool state before switching
            if (currentToolId !== null && currentToolId !== id) {
                const toolContent = document.getElementById('toolContent');
                if (toolContent) {
                    const hasResults = toolContent.innerHTML.includes('result-header') || 
                                      toolContent.innerHTML.includes('private-key') ||
                                      toolContent.innerHTML.includes('pre>') ||
                                      toolContent.querySelector('.result-header, .private-key, pre');
                    if (hasResults) {
                        saveToolState(currentToolId);
                    }
                }
            }
            
            const tool = TOOLS_DATA.find(function(t) { return t.id === id; });
            if (!tool) return;
            
            currentToolId = id;
            LastViewedToolId = id;  // Track last viewed tool
            
            // ★ BUILD BREADCRUMB NAVIGATION (privatekeyfinder.io style) ★
            let toolbarHTML = `
                <div class="breadcrumb-nav">
                    <a href="#" class="home-link" onclick="goHome(); return false;" title="Go Home">
                        <i class="fas fa-home"></i> Home
                    </a>
                    <span class="separator">/</span>
                    <a href="#" onclick="goHome(); return false;">${tool.category}</a>
                    <span class="separator">/</span>
                    <span class="current-page">${tool.title}</span>
                    <button class="breadcrumb-back-btn" onclick="goHome()" title="Back to Tools List">
                        <i class="fas fa-arrow-left"></i> Back
                    </button>
                    <button class="breadcrumb-save-btn" onclick="saveCurrentResult()" title="💾 Save Results as TXT File">
                        <i class="fas fa-download"></i> Save TXT
                    </button>
                    <div class="api-status-indicator status-checking" id="connection-status" title="API Connection Status - Hover for details">
                        <span class="api-status-dot"></span>
                        <span class="api-status-text">CHECKING...</span>
                        <div class="api-status-detail">
                            <h4><i class="fas fa-network-wired" style="margin-right:6px;color:#4a6cf7;"></i>API Status</h4>
                            <div id="api-status-list">
                                <div class="api-item"><span class="api-name">Checking...</span><span class="api-state"><span class="mini-dot" style="background:#8892a8;"></span> --</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="toolContent"></div>
            `;
            
            document.getElementById('tool-view').innerHTML = toolbarHTML;
            
            // Check if we have saved state for this tool
            const hasSavedState = restoreToolState(id);
            
            if (!hasSavedState) {
                // No saved state - show fresh tool content
                document.getElementById('toolContent').innerHTML = '<div class="tool-card">' + tool.content + '</div>';
            } else {
                // State restored - show indicator and reset button
                const cacheTime = Math.round((Date.now() - ToolStateCache[id].timestamp) / 1000);
                
                // Update breadcrumb with cached indicator
                const currentPage = document.querySelector('.breadcrumb-nav .current-page');
                if (currentPage) {
                    currentPage.innerHTML = tool.title + 
                        ' <span style="font-size:10px;color:#00ff88;font-weight:700;margin-left:6px;background:rgba(0,255,136,0.15);padding:2px 8px;border-radius:4px;">● CACHED (' + (cacheTime < 60 ? cacheTime + 's' : Math.round(cacheTime/60) + 'm') + ')</span>' +
                        ' <button onclick="resetCurrentTool()" style="margin-left:6px;font-size:9px;padding:3px 10px;background:#ff4444;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:700;" title="Clear results">✕</button>';
                }
                
                // Restore scroll position after a small delay
                if (ToolStateCache[id].scrollY && ToolStateCache[id].scrollY > 0) {
                    setTimeout(function() {
                        window.scrollTo({ top: ToolStateCache[id].scrollY, behavior: 'instant' });
                    }, 100);
                }
            }
            
            // Show fullscreen view
            document.getElementById('directory-view').classList.add('hidden');
            document.getElementById('tool-view').classList.add('active');
            
            // ★ Show save button when tool is open ★
            document.body.classList.add('tool-open');
            const saveBtn = document.querySelector('.main-save-txt');
            if (saveBtn) {
                saveBtn.style.display = 'inline-flex';
                saveBtn.setAttribute('title', '💾 Save Results as TXT File');
            }
            
            // Scroll to top of fullscreen view
            window.scrollTo({ top: 0, behavior: 'instant' });
            
            // Don't auto-check API status - wait for actual user action
            // Status will update when user clicks a button that makes real API call
            initApiStatusOffline();
        }

        function goHome() {
            // Auto-save current tool state before leaving
            if (currentToolId !== null) {
                const toolContent = document.getElementById('toolContent');
                if (toolContent) {
                    // Check if there are any results (more than just the initial form)
                    const hasResults = toolContent.innerHTML.includes('result-header') || 
                                      toolContent.innerHTML.includes('private-key') ||
                                      toolContent.innerHTML.includes('pre>') ||
                                      toolContent.querySelector('.result-header, .private-key, pre');
                    if (hasResults) {
                        saveToolState(currentToolId);
                    }
                }
            }
            
            currentToolId = null;
            document.getElementById('directory-view').classList.remove('hidden');
            document.getElementById('tool-view').classList.remove('active');
            
            // ★ Hide save button when on home page ★
            document.body.classList.remove('tool-open');
            const saveBtn = document.querySelector('.main-save-txt');
            if (saveBtn) {
                saveBtn.style.display = 'none';
                saveBtn.setAttribute('title', 'Save Results as TXT');
            }
        }

        // ★ API STATUS CHECKER - 100% REAL-TIME (No Fake Timers!) ★
        let activeApiCalls = 0; // Kitni API calls abhi chal rahi hain
        let currentApiState = { blockchain: null, mempool: null }; // Real-time state
        
        // Initialize status to OFFLINE by default
        function initApiStatusOffline() {
            const statusEl = document.getElementById('connection-status');
            const statusList = document.getElementById('api-status-list');
            
            if (!statusEl) return;
            
            statusEl.className = 'api-status-indicator status-offline';
            statusEl.querySelector('.api-status-text').textContent = 'OFFLINE';
            
            if (statusList) {
                updateApiStatusDetail(statusList);
            }
        }
        
        // Update UI based on CURRENT state (real-time)
        function setApiStatus(state, apiName) {
            const statusEl = document.getElementById('connection-status');
            if (!statusEl) return;
            
            // Update internal state
            if (apiName) {
                currentApiState[apiName] = state;
            }
            
            // Update UI
            if (state === 'checking') {
                statusEl.className = 'api-status-indicator status-checking';
                statusEl.querySelector('.api-status-text').textContent = 'CHECKING...';
            } else if (state === 'online') {
                statusEl.className = 'api-status-indicator status-online';
                statusEl.querySelector('.api-status-text').textContent = 'ONLINE';
            } else {
                statusEl.className = 'api-status-indicator status-offline';
                statusEl.querySelector('.api-status-text').textContent = 'OFFLINE';
            }
            
            const statusList = document.getElementById('api-status-list');
            if (statusList) updateApiStatusDetail(statusList);
        }
        
        function updateApiStatusDetail(container) {
            if (!container) return;
            
            const apis = [
                { name: 'Blockchain.info', key: 'blockchain', url: 'blockchain.info' },
                { name: 'Mempool.space', key: 'mempool', url: 'mempool.space' }
            ];
            
            let html = '<h4><i class="fas fa-network-wired" style="margin-right:6px;color:#4a6cf7;"></i>API Status</h4>';
            
            apis.forEach(api => {
                const isOnline = currentApiState[api.key] === 'online';
                const isOffline = currentApiState[api.key] === 'offline';
                const isChecking = currentApiState[api.key] === 'checking';
                const isUnknown = !currentApiState[api.key];
                
                let stateClass = '';
                let stateText = '--';
                let dotClass = '';
                
                if (isOnline) {
                    stateClass = 'online';
                    stateText = 'ONLINE';
                    dotClass = 'online';
                } else if (isOffline) {
                    stateClass = 'offline';
                    stateText = 'OFFLINE';
                    dotClass = 'offline';
                } else if (isChecking) {
                    stateClass = '';
                    stateText = '...';
                    dotClass = 'checking';
                } else {
                    stateClass = '';
                    stateText = '--';
                    dotClass = '';
                }
                
                html += `
                    <div class="api-item">
                        <span class="api-name">${api.name}</span>
                        <span class="api-state ${stateClass}">
                            <span class="mini-dot ${dotClass}" style="background:${isOnline ? '#22b573' : isOffline ? '#000000' : '#8892a8'}"></span>
                            ${stateText}
                        </span>
                    </div>
                `;
            });
            
            container.innerHTML = html;
        }
        
// No fake intervals - status is 100% real-time!
        
        // ★ REAL-TIME FETCH INTERCEPTOR - Tracks every API call as it happens ★
        const originalFetch = window.fetch;
        window.fetch = async function(...args) {
            const url = typeof args[0] === 'string' ? args[0] : args[0]?.url || '';
            const isApiCall = url.includes('blockchain.info') || url.includes('mempool.space');
            
            // API call start → show CHECKING immediately
            if (isApiCall) {
                activeApiCalls++;
                console.log('[API] 📡 Call started (' + activeApiCalls + ' active):', url.substring(0, 60));
                setApiStatus('checking');
            }
            
            try {
                const result = await originalFetch.apply(this, args);
                
                if (isApiCall) {
                    activeApiCalls--; // This call finished
                    
                    if (result.ok) {
                        // Try to read response data
                        try {
                            const clone = result.clone();
                            const text = await clone.text();
                            
                            if (text && text.length > 5) {
                                // ✅ SUCCESS - Real data received!
                                const apiName = url.includes('blockchain.info') ? 'blockchain' : 'mempool';
                                currentApiState[apiName] = 'online';
                                console.log('[API] ✅ ONLINE! Data received (' + activeApiCalls + ' remaining)');
                                setApiStatus('online');
                                
                                // TURANT offline - sirf success dikhaya, ab wapas offline
                                setTimeout(function() {
                                    if (activeApiCalls <= 0) {
                                        activeApiCalls = 0;
                                        currentApiState.blockchain = null;
                                        currentApiState.mempool = null;
                                        console.log('[API] 🔴 OFFLINE (done)');
                                        setApiStatus('offline');
                                    }
                                }, 800); // 0.8 sec - user ko dikha ke hide
                            } else {
                                // Empty response → OFFLINE
                                console.log('[API] ⚠️ Empty response (' + activeApiCalls + ' remaining)');
                                if (activeApiCalls <= 0) { activeApiCalls = 0; setApiStatus('offline'); }
                            }
                        } catch (e) {
                            console.log('[API] Read error:', e);
                            if (activeApiCalls <= 0) { activeApiCalls = 0; setApiStatus('offline'); }
                        }
                    } else {
                        // HTTP Error → OFFLINE
                        console.log('[API] ❌ HTTP Error: ' + result.status);
                        if (activeApiCalls <= 0) { activeApiCalls = 0; setApiStatus('offline'); }
                    }
                }
                
                return result;
                
            } catch (error) {
                // FETCH FAILED → OFFLINE turant!
                if (isApiCall) {
                    activeApiCalls--;
                    console.log('[API] 💥 FAILED: ' + error.message);
                    if (activeApiCalls <= 0) { activeApiCalls = 0; setApiStatus('offline'); }
                }
                throw error;
            }
        };
        
        
        // ★ ENSURE HEADER BUTTONS SHOW IN ALL TOOLS ★
        function ensureHeaderButtons() {
            // Find all output elements
            document.querySelectorAll('[id^="out_"]').forEach(function(out) {
                // Check if it already has our header
                if (!out.querySelector('.perfect-header-bar') && out.innerHTML.trim().length > 10) {
                    // Don't add to empty/waiting states
                    if (out.innerText.includes('Waiting') || out.innerText.length < 5) return;
                    
                    // Get the element ID
                    const id = out.id;
                    
                    // Create and prepend header
                    const headerHTML = createQuickHeader(id);
                    if (headerHTML && !out.innerHTML.includes('perfect-header-bar')) {
                        out.innerHTML = headerHTML + out.innerHTML;
                    }
                }
            });
        }
        
        function createQuickHeader(elementId) {
            return `<div class="perfect-header-bar">
                <div class="header-left">
                    <div class="brand-logo" style="font-size:13px;">▌CT</div>
                </div>
                <div class="header-right">
                    <div class="cat-btn-group">
                        <button class="cat-btn" onclick="quickSwitchCategory('Convert')" title="Conversion">🔄</button>
                        <button class="cat-btn" onclick="quickSwitchCategory('Wallet')" title="Wallet">🔑</button>
                        <button class="cat-btn" onclick="quickSwitchCategory('Blockchain')" title="Blockchain">⛓️</button>
                        <button class="cat-btn" onclick="quickSwitchCategory('Analysis')" title="Analysis">🔍</button>
                        <button class="cat-btn" onclick="quickSwitchCategory('Exploit')" title="Exploits">💥</button>
                        <button class="cat-btn cat-btn-back" onclick="goHome()" title="Home">🏠</button>
                    </div>
                </div>
            </div>`;
        }
        
        // Run after DOM updates
        setInterval(ensureHeaderButtons, 2000);
        

// ★ QUICK CATEGORY SWITCHER - Jump to any category instantly! ★
        function quickSwitchCategory(category) {
            if (!category) return;
            
            if (category === 'back') {
                goHome();
                return;
            }
            
            // Check if we're in tool view
            const toolView = document.getElementById('tool-view');
            const dirView = document.getElementById('directory-view');
            
            if (toolView && toolView.classList.contains('active')) {
                // We're in tool view - go back AND filter
                goHome();
                setTimeout(function() {
                    filterCategory(category);
                    // Also highlight the correct tab
                    highlightCategoryTab(category);
                }, 150);
            } else {
                // Already on home - just filter, NO REFRESH!
                filterCategory(category);
                highlightCategoryTab(category);
            }
        }
        
        // Highlight the active category tab
        function highlightCategoryTab(category) {
            document.querySelectorAll('.category-tab').forEach(function(tab) {
                tab.classList.toggle('active', tab.getAttribute('data-category') === category.toLowerCase());
            });
        }
        
        // Save current result from any visible output - ULTRA ROBUST VERSION
        function saveCurrentResult() {
            try {
                // Check if we're even in a tool view
                const toolView = document.getElementById('tool-view');
                if (!toolView || !toolView.classList.contains('active')) {
                    showSaveNotification('⚠️ Please open a tool first!', 'warning');
                    return;
                }
                
                let resultParts = [];
                let toolName = 'Tool';
                
                // Get tool name from breadcrumb
                const currentPage = document.querySelector('.breadcrumb-nav .current-page');
                if (currentPage) {
                    // Extract just the tool name without CACHED badge
                    toolName = currentPage.textContent.split('●')[0].trim();
                }
                
                const toolContent = document.getElementById('toolContent');
                if (!toolContent) {
                    showSaveNotification('⚠️ Tool content not found!', 'error');
                    return;
                }
                
                // === METHOD 1: Find ALL output elements with id starting with out_ ===
                const outputs = toolContent.querySelectorAll('[id^="out_"]');
                outputs.forEach(function(out, idx) {
                    const text = (out.innerText || out.textContent || '').trim();
                    // Skip placeholder texts
                    if (text.length > 5 && 
                        !text.includes('Waiting for input') && 
                        !text.includes('Enter your') &&
                        !text.startsWith('Instructions:') &&
                        !text.includes('Paste your')) {
                        resultParts.push('── Output ' + (idx+1) + ' ──\n' + text);
                    }
                });
                
                // === METHOD 2: Look for pre tags with substantial content ===
                if (resultParts.length === 0) {
                    const preTags = toolContent.querySelectorAll('pre');
                    preTags.forEach(function(pre) {
                        const text = (pre.innerText || pre.textContent || '').trim();
                        if (text.length > 5 && 
                            !text.includes('Waiting for input') && 
                            !text.includes('Enter your')) {
                            resultParts.push(text);
                        }
                    });
                }
                
                // === METHOD 3: Look for textarea values ===
                const textareas = toolContent.querySelectorAll('textarea');
                textareas.forEach(function(ta) {
                    const text = (ta.value || '').trim();
                    if (text.length > 3) {
                        resultParts.push('── Textarea ──\n' + text);
                    }
                });
                
                // === METHOD 4: Look for result classes ===
                const resultClasses = toolContent.querySelectorAll('.result-header, .private-key, .perfect-result, .output-area, .key-result, .address-result, .balance-result');
                resultClasses.forEach(function(el) {
                    const text = (el.innerText || el.textContent || el.value || '').trim();
                    if (text.length > 3) {
                        resultParts.push(text);
                    }
                });
                
                // === METHOD 5: Look for code blocks ===
                const codeBlocks = toolContent.querySelectorAll('code');
                codeBlocks.forEach(function(code) {
                    const text = (code.innerText || code.textContent || '').trim();
                    if (text.length > 3 && !text.includes('<') && !code.closest('pre')) {
                        resultParts.push(text);
                    }
                });
                
                // === METHOD 6: Last resort - scan all visible text content ===
                if (resultParts.length === 0) {
                    // Get all direct children's text
                    const children = toolContent.children;
                    for (let i = 0; i < children.length; i++) {
                        const child = children[i];
                        // Skip input fields and buttons
                        if (child.tagName === 'INPUT' || child.tagName === 'BUTTON' || 
                            child.tagName === 'LABEL' || child.classList.contains('breadcrumb-nav')) {
                            continue;
                        }
                        const text = (child.innerText || child.textContent || '').trim();
                        if (text.length > 20 && 
                            !text.includes('CRYPTOGRAPHYTUBE') &&
                            !child.querySelector('input, button')) {
                            resultParts.push(text);
                        }
                    }
                }
                
                // Combine all results
                let resultText = resultParts.join('\n\n' + '═'.repeat(50) + '\n\n');
                
                // Clean up the result
                resultText = resultText
                    .replace(/\n{4,}/g, '\n\n')  // Remove excessive newlines
                    .replace(/^\s+|\s+$/g, '');     // Trim
                
                // If STILL no results
                if (!resultText || resultText.trim().length < 5) {
                    showSaveNotification('⚠️ No results to save!\nRun a tool first, then save.', 'warning');
                    return;
                }
                
                // Generate TXT file content with header
                const separator = '═'.repeat(55);
                let fileContent = '';
                fileContent += separator + '\n';
                fileContent += '   CRYPTOGRAPHYTUBE PRO - RESULT EXPORT\n';
                fileContent += separator + '\n\n';
                fileContent += '📁 Tool: ' + toolName + '\n';
                fileContent += '📅 Date: ' + new Date().toLocaleString() + '\n';
                fileContent += '🌐 URL: ' + window.location.href + '\n';
                fileContent += separator + '\n\n';
                fileContent += resultText;
                fileContent += '\n\n' + separator + '\n';
                fileContent += 'Generated by CryptographyTube Pro Suite\n';
                fileContent += separator + '\n';
                
                // Create and trigger download - MOBILE COMPATIBLE METHOD
                const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
                const fileName = 'CT_' + toolName.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30) + '_' + getTimestamp() + '.txt';
                
                // Try multiple download methods for maximum compatibility
                if (downloadBlob(blob, fileName)) {
                    showSaveNotification('✅ File saved: ' + fileName, 'success');
                } else {
                    showSaveNotification('❌ Download failed. Try again.', 'error');
                }
                
            } catch (err) {
                console.error('Save error:', err);
                showSaveNotification('❌ Error: ' + err.message, 'error');
            }
        }
        
        // Helper: Get timestamp for filename
        function getTimestamp() {
            const now = new Date();
            return now.getFullYear() + 
                   String(now.getMonth()+1).padStart(2,'0') + 
                   String(now.getDate()).padStart(2,'0') + '_' +
                   String(now.getHours()).padStart(2,'0') + 
                   String(now.getMinutes()).padStart(2,'0') +
                   String(now.getSeconds()).padStart(2,'0');
        }
        
        // Helper: Download blob with multiple methods for mobile compatibility
        function downloadBlob(blob, fileName) {
            try {
                // Method 1: Standard anchor click (works on most browsers)
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                
                // Cleanup after a delay
                setTimeout(function() {
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                }, 100);
                
                return true;
            } catch (e) {
                console.error('Download method 1 failed:', e);
                
                // Method 2: Try using navigator.share if available (mobile)
                if (navigator.share && navigator.canShare) {
                    const file = new File([blob], fileName, { type: 'text/plain' });
                    if (navigator.canShare({ files: [file] })) {
                        navigator.share({ files: [file], title: 'CryptographyTube Results' })
                            .catch(function(err) { console.log('Share failed:', err); });
                        return true;
                    }
                }
                
                // Method 3: Open in new tab
                const url = URL.createObjectURL(blob);
                const win = window.open(url, '_blank');
                if (win) {
                    setTimeout(function() { URL.revokeObjectURL(url); }, 1000);
                    return true;
                }
                
                return false;
            }
        }
        
        // Helper: Show visual notification for save status
        function showSaveNotification(message, type) {
            // Remove existing notification
            const existing = document.getElementById('save-notification');
            if (existing) existing.remove();
            
            // Create notification element
            const notification = document.createElement('div');
            notification.id = 'save-notification';
            notification.style.cssText = [
                'position: fixed',
                'top: 60px',
                'right: 20px',
                'left: 20px',
                'max-width: 400px',
                'margin-left: auto',
                'padding: 14px 20px',
                'border-radius: 10px',
                'font-size: 14px',
                'font-weight: 600',
                'z-index: 99999',
                'animation: slideInNotif 0.3s ease',
                'text-align: center',
                'box-shadow: 0 4px 20px rgba(0,0,0,0.3)',
                type === 'success' ? 'background: linear-gradient(135deg, #22b573, #1a9d5f); color: white;' :
                type === 'warning' ? 'background: linear-gradient(135deg, #ff9800, #f57c00); color: white;' :
                'background: linear-gradient(135deg, #ff4444, #cc0000); color: white;'
            ].join(';');
            notification.innerHTML = message;
            
            // Add animation keyframes if not exists
            if (!document.getElementById('notif-styles')) {
                const style = document.createElement('style');
                style.id = 'notif-styles';
                style.textContent = '@keyframes slideInNotif { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } } @keyframes slideOutNotif { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }';
                document.head.appendChild(style);
            }
            
            document.body.appendChild(notification);
            
            // Auto remove after 3 seconds
            setTimeout(function() {
                notification.style.animation = 'slideOutNotif 0.3s ease forwards';
                setTimeout(function() { notification.remove(); }, 300);
            }, 3000);
        }
        
        function filterCards(query) {
            const q = query.toLowerCase().trim();
            document.querySelectorAll('.card').forEach(function(card) {
                card.style.display = (!q || (card.getAttribute('data-search')||'').includes(q)) ? '' : 'none';
            });
        }

        function filterCategory(category) {
            document.querySelectorAll('.category-tab').forEach(function(tab) {
                tab.classList.toggle('active', tab.getAttribute('data-category') === category);
            });
            document.querySelectorAll('.card').forEach(function(card) {
                card.style.display = (category === 'all') ? '' : 
                    ((card.getAttribute('data-category')||'') === category.toLowerCase()) ? '' : 'none';
            });
        }
    