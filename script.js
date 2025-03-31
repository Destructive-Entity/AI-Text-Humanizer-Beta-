// --- Get HTML Elements ---
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const findSuggestionsButton = document.getElementById('findSuggestionsButton');
const statusP = document.getElementById('status'); // General status
const suggestionsListDiv = document.getElementById('suggestionsList');
const suggestionsStatusP = document.getElementById('suggestionsStatus');
const applyChangesButton = document.getElementById('applyChangesButton');

// --- Define Transformation Rules ---
// THIS IS THE LARGE, ARRAY-BASED LIST
const wordReplacements = {
    // --- Common Overused Verbs & Replacements ---
    "utilize": ["use"], "utilizes": ["uses"], "utilized": ["used"], "utilizing": ["using"],
    "leverage": ["use"], "leverages": ["uses"], "leveraged": ["used"], "leveraging": ["using"],
    "facilitate": ["help", "ease", "enable"], "facilitates": ["helps", "eases", "enables"], "facilitated": ["helped", "eased", "enabled"], "facilitating": ["helping", "easing", "enabling"],
    "optimize": ["improve", "refine", "enhance"], "optimizes": ["improves", "refines", "enhances"], "optimized": ["improved", "refined", "enhanced"], "optimizing": ["improving", "refining", "enhancing"],
    "enhance": ["improve", "boost", "increase"], "enhances": ["improves", "boosts", "increases"], "enhanced": ["improved", "boosted", "increased"], "enhancing": ["improving", "boosting", "increasing"],
    "streamline": ["simplify", "improve", "make easier"], "streamlines": ["simplifies", "improves", "makes easier"], "streamlined": ["simplified", "improved", "made easier"],
    "showcase": ["show", "display", "highlight"], "showcases": ["shows", "displays", "highlights"], "showcased": ["showed", "displayed", "highlighted"], "showcasing": ["showing", "displaying", "highlighting"],
    "demonstrate": ["show", "prove", "illustrate"], "demonstrates": ["shows", "proves", "illustrates"], "demonstrated": ["showed", "proved", "illustrated"], "demonstrating": ["showing", "proving", "illustrating"],
    "ascertain": ["find out", "determine", "confirm"], "ascertains": ["finds out", "determines", "confirms"], "ascertained": ["found out", "determined", "confirmed"],
    "endeavor": ["try", "attempt"], "endeavors": ["tries", "attempts"], "endeavored": ["tried", "attempted"],
    "commence": ["start", "begin"], "commences": ["starts", "begins"], "commenced": ["started", "began"],
    "terminate": ["end", "finish", "stop"], "terminates": ["ends", "finishes", "stops"], "terminated": ["ended", "finished", "stopped"],
    "delve": ["look", "examine"], "delves": ["looks", "examines"], "delved": ["looked", "examined"], // Often needs "into" context
    "explore": ["look at", "examine", "investigate"], "explores": ["looks at", "examines", "investigates"], "explored": ["looked at", "examined", "investigated"],
    "navigate": ["handle", "manage", "deal with"], "navigates": ["handles", "manages", "deals with"], "navigated": ["handled", "managed", "dealt with"],
    "harness": ["use", "utilize"], "harnesses": ["uses", "utilizes"], "harnessed": ["used", "utilized"],
    "foster": ["encourage", "promote", "support"], "fosters": ["encourages", "promotes", "supports"], "fostered": ["encouraged", "promoted", "supported"],
    "spearhead": ["lead", "initiate"], "spearheads": ["leads", "initiates"], "spearheaded": ["led", "initiated"],
    "underscore": ["emphasize", "highlight", "stress"], "underscores": ["emphasizes", "highlights", "stresses"], "underscored": ["emphasized", "highlighted", "stressed"],
    "enable": ["allow", "permit", "let"], "enables": ["allows", "permits", "lets"], "enabled": ["allowed", "permitted", "let"],
    "ensure": ["make sure", "confirm"], "ensures": ["makes sure", "confirms"], "ensured": ["made sure", "confirmed"],
    "revolutionize": ["change greatly", "transform"], "revolutionizes": ["changes greatly", "transforms"], "revolutionized": ["changed greatly", "transformed"],
    "empower": ["enable", "allow", "authorize"], "empowers": ["enables", "allows", "authorizes"], "empowered": ["enabled", "allowed", "authorized"],

    // --- Common Overused Nouns & Replacements ---
    "synergy": ["cooperation", "teamwork", "collaboration"],
    "methodology": ["method", "approach", "technique"], "methodologies": ["methods", "approaches", "techniques"],
    "paradigm": ["model", "pattern", "example", "framework"], "paradigms": ["models", "patterns", "examples", "frameworks"],
    "plethora": ["abundance", "lot", "many"], // Use 'lot' cautiously
    "myriad": ["many", "numerous", "countless"],
    "complexities": ["details", "challenges", "difficulties", "intricacies"],
    "intricacies": ["details", "complexities", "subtleties"],
    "realm": ["area", "field", "domain", "sphere"],
    "landscape": ["situation", "environment", "field", "area"], // Often jargon
    "tapestry": ["mix", "combination", "variety"], // Often flowery
    "ambit": ["scope", "range", "limits"],
    "potential": ["potential", "possibility", "capacity"], // Sometimes fine, but often vague
    "capabilities": ["abilities", "features", "skills"],
    "functionality": ["features", "functions", "operations"],
    "deliverables": ["results", "work", "output", "products"], // Jargon
    "stakeholders": ["people involved", "groups involved", "interested parties"],
    "ecosystem": ["environment", "system", "network", "community"], // Jargon
    "narrative": ["story", "account", "message", "description"],
    "touchpoint": ["interaction", "contact point", "interface"], // Jargon
    "pain points": ["problems", "issues", "frustrations", "challenges"], // Jargon
    "implications": ["effects", "consequences", "results", "suggestions"],
    "ramifications": ["consequences", "effects", "results"],
    "repercussions": ["consequences", "effects", "results", "backlash"],
    "benchmark": ["standard", "reference point", "measure"],
    "metrics": ["measures", "numbers", "data", "indicators"],
    "analytics": ["analysis", "data", "statistics"],
    "insights": ["understanding", "findings", "observations", "perceptions"], // Often overused
    "competency": ["skill", "ability", "expertise"], "competencies": ["skills", "abilities", "expertise"],
    "infrastructure": ["structure", "foundation", "setup", "framework"],
    "initiative": ["project", "effort", "plan", "program"],
    "component": ["part", "piece", "element", "module"],
    "aspect": ["part", "feature", "side", "element"],
    "factor": ["element", "cause", "reason", "influence"],
    "criterion": ["standard", "measure", "rule"], "criteria": ["standards", "measures", "rules"],
    "framework": ["structure", "system", "outline", "guidelines"],

    // --- Common Overused Adjectives & Replacements ---
    "robust": ["strong", "reliable", "solid", "sturdy"],
    "seamless": ["smooth", "easy", "effortless", "uninterrupted"],
    "smooth": ["easy", "even", "fluid"],
    "easy": ["simple", "straightforward"],
    "effortless": ["easy", "simple"],
    "comprehensive": ["complete", "thorough", "detailed", "full"],
    "intricate": ["complex", "detailed", "elaborate"],
    "pivotal": ["key", "crucial", "vital", "central", "important"],
    "crucial": ["important", "key", "vital", "essential"],
    "essential": ["necessary", "key", "vital", "fundamental", "important"],
    "vital": ["essential", "key", "crucial", "important"],
    "significant": ["important", "major", "large", "notable"],
    "substantial": ["large", "significant", "considerable", "major"],
    "considerable": ["large", "significant", "substantial"],
    "profound": ["deep", "significant", "major", "intense"],
    "remarkable": ["notable", "impressive", "extraordinary", "striking"], // Often overused praise
    "notable": ["important", "significant", "worth noting", "remarkable"],
    "vibrant": ["lively", "active", "colorful", "energetic"], // Context dependent
    "dynamic": ["changing", "active", "energetic", "lively"],
    "innovative": ["new", "original", "creative", "modern"],
    "cutting-edge": ["advanced", "modern", "new", "leading"],
    "state-of-the-art": ["modern", "advanced", "latest", "top"],
    "next-gen": ["next-generation", "new", "future", "advanced"],
    "user-friendly": ["easy to use", "simple", "intuitive"],
    "holistic": ["complete", "overall", "comprehensive", "integrated"],
    "strategic": ["planned", "key", "important", "calculated"], // Often jargon
    "actionable": ["useful", "practical", "concrete"], // Jargon
    "impactful": ["effective", "significant", "influential"], // Jargon
    "transformative": ["changing", "revolutionary", "significant"],
    "groundbreaking": ["new", "revolutionary", "pioneering"], // Often hyperbolic
    "mission-critical": ["essential", "vital", "crucial"], // Jargon
    "best-in-class": ["top", "leading", "excellent"], // Jargon
    "high-impact": ["effective", "significant", "influential"],
    "scalable": ["expandable", "adaptable", "flexible"],
    "sustainable": ["long-lasting", "maintainable", "viable", "eco-friendly"],
    "interconnected": ["connected", "related", "linked"],
    "multifaceted": ["complex", "varied", "diverse"],
    "nuanced": ["subtle", "detailed", "complex"],
    "meticulous": ["careful", "detailed", "thorough", "precise"],
    "keen": ["sharp", "eager", "strong", "interested"],
    "key": ["important", "main", "crucial", "central"], // Overused
    "personalized": ["customized", "individual", "tailored"],
    "tailored": ["customized", "specific", "suited"],
    "customized": ["personalized", "specific", "tailored"],
    "proactive": ["forward-looking", "prepared", "anticipatory"],
    "reactive": ["responsive", "responding"],
    "insightful": ["perceptive", "useful", "informative", "wise"], // Overused
    "data-driven": ["based on data", "informed by data"], // Jargon
    "results-oriented": ["focused on results", "goal-oriented"], // Jargon
    "customer-centric": ["focused on customers", "user-focused"], // Jargon
    "flexible": ["adaptable", "versatile", "adjustable"],
    "agile": ["flexible", "adaptable", "quick"], // Often jargon
    "transparent": ["open", "clear", "honest"],
    "ethical": ["moral", "principled", "right"],
    "aforementioned": ["previously mentioned", "mentioned above", "the above"],
    "exhaustive": ["complete", "thorough", "comprehensive"],
    "labyrinthine": ["complex", "maze-like", "complicated"], // Flowery
    "gossamer": ["delicate", "thin", "light"], // Flowery
    "indelible": ["permanent", "unforgettable", "lasting"], // Flowery

    // --- Common Overused Adverbs & Replacements ---
    "significantly": ["greatly", "largely", "considerably", "importantly", "noticeably"],
    "notably": ["importantly", "especially", "particularly", "significantly"],
    "remarkably": ["very", "unusually", "notably", "surprisingly"],
    "substantially": ["greatly", "largely", "significantly"],
    "considerably": ["greatly", "largely", "significantly", "much"],
    "promptly": ["quickly", "soon", "immediately"],
    "subsequently": ["later", "afterwards", "next", "then"],
    "accordingly": ["so", "therefore", "thus", "consequently"],
    "consequently": ["so", "as a result", "therefore", "thus"],
    "seamlessly": ["smoothly", "easily", "without interruption"],
    "effortlessly": ["easily", "simply"],
    "generally": ["usually", "typically", "often", "mostly"],
    "specifically": ["particularly", "in particular"], // Often fine
    "essentially": ["basically", "fundamentally", "mostly"],
    "ultimately": ["finally", "in the end", "eventually"],
    "arguably": ["possibly", "perhaps", "conceivably"], // Can soften tone
    "strategically": [""], // Often removable jargon
    "proactively": [""], // Often removable jargon
    "increasingly": ["more", "more and more", "more often"],

    // --- Common Overused Transitions & Conjunctions ---
    "furthermore": ["also", "besides", "in addition", "plus"],
    "moreover": ["also", "besides", "in addition", "furthermore"], // Add variation
    "additionally": ["also", "besides", "in addition", "plus"],
    "however": ["but", "yet", "though", "still"], // Vary usage
    "thus": ["so", "therefore", "hence", "consequently"],
    "therefore": ["so", "thus", "hence", "as a result"],
    "indeed": [""], // Often removable filler, or use "certainly", "truly"
    "whilst": ["while"], // 'while' is more common
    "in contrast": ["however", "but", "on the other hand"],
    "on the other hand": ["however", "but", "alternatively", "in contrast"],
    "similarly": ["likewise", "in the same way"],
    "nonetheless": ["however", "despite this", "still", "even so"],
    "nevertheless": ["however", "despite this", "still", "even so"],
    "alternatively": ["or", "instead"],
    "despite": ["even with", "in spite of"],
    "although": ["though", "even though", "while"],
    "whereas": ["while", "but", "though"],
    "in order to": ["to"], // Simpler infinitive
    "as well as": ["and", "also", "plus"],

    // --- Common Boilerplate Phrases & Replacements ---
    "it is crucial": ["it's important", "we must", "it is vital"],
    "it is essential": ["it's necessary", "we need to", "it is vital"],
    "it is vital": ["it's key", "we need to", "it is crucial", "it's essential"],
    "it is important to note": ["note that", "importantly", "it's worth noting"],
    "it should be noted": ["note that", "we should note"],
    "it is worth noting": ["it's worth noting", "notably", "note that"],
    "it's important to note": ["note that", "importantly", "it's worth noting"], // Contraction form
    "it's worth mentioning that": ["it's worth mentioning", "notably", "I should add"],
    "let's delve into": ["let's look at", "let's examine", "let's discuss"],
    "let's explore": ["let's look at", "let's discuss", "let's consider"],
    "let's unpack": ["let's examine", "let's discuss", "let's analyze"], // Jargon
    "let's dive into": ["let's look at", "let's discuss", "let's get into"],
    "due to the fact that": ["because", "since", "as"],
    "in light of the fact that": ["because", "since", "as", "considering"],
    "given the fact that": ["because", "since", "as", "considering"],
    "owing to the fact that": ["because", "since", "as"],
    "bearing in mind that": ["keeping in mind", "since", "considering", "remembering that"],
    "it is important to know": ["it's important to know", "remember that", "note that"],
    "it is crucial to understand": ["it's crucial to understand", "we need to understand", "understanding this is key"],
    "it is essential to consider": ["we should consider", "consider", "it's key to consider"],
    "as a matter of fact": ["in fact", "actually"],
    "in terms of": ["regarding", "concerning", "about", "for", "when it comes to"], // Context dependent
    "based on the information provided": [""], // Often removable, implies context
    "when it comes to": ["regarding", "concerning", "for", "with"],
    "in the context of": ["regarding", "concerning", "within", "for"],
    "with regard to": ["regarding", "concerning", "about"],
    "in relation to": ["regarding", "concerning", "related to", "about"],
    "it depends on": ["it depends on"], // Sometimes okay, but can be vague
    "can vary depending on": ["depends on", "varies with"],
    "that being said": ["however", "that said", "still"],
    "you may want to": ["you could", "consider", "perhaps"], // Softer suggestion
    "you might want to consider": ["you could consider", "consider", "perhaps think about"],
    "it is generally considered": ["it's usually considered", "people usually consider", "it's often seen as"],
    "it is advisable": ["you should", "it's best to", "we recommend"],
    "it stands to reason that": ["it makes sense that", "logically", "clearly"],
    "needless to say": [""], // Usually is needless
    "in conclusion": ["overall", "to sum up", "finally", "in closing"],
    "to conclude": ["finally", "in closing", "to sum up"],
    "in summary": ["to summarize", "overall", "in short", "briefly"],
    "to summarize": ["in short", "briefly", "overall"],
    "all in all": ["overall", "in summary"],
    "at the end of the day": ["ultimately", "in the end", "basically"], // Cliché
    "bottom line": ["the main point is", "essentially", "basically"], // Cliché
    "the key takeaway": ["the main point", "the key lesson", "remember this"],
    "moving forward": ["in the future", "next", "going forward"], // Often filler
    "rest assured": ["be assured", "don't worry", "certainly"],
    "it goes without saying": [""], // Usually does go without saying

    // --- Common AI Jargon & Buzzwords ---
    "unlock the potential of": ["use", "enable", "develop", "tap into"], // Suggest rephrasing
    "unleash the power of": ["use", "enable", "apply"], // Suggest rephrasing
    "harness the power of": ["use", "apply"],
    "pave the way for": ["allow", "lead to", "enable", "prepare for"],
    "at the forefront of": ["leading", "a leader in", "pioneering"],
    "embark on a journey": ["start", "begin", "undertake"],
    "push the boundaries of": ["advance", "innovate in", "go beyond"],
    "a gateway to": ["a way to", "access to", "an entry into"],
    "bridging the gap between": ["connecting", "linking", "uniting"],
    "spearhead the initiative": ["lead the project", "lead the effort", "champion"],
    "capitalize on the opportunities": ["use the opportunities", "take advantage of"],
    "navigate the complexities": ["handle the complexities", "understand the details", "manage the difficulties"],
    "lay the groundwork for": ["prepare for", "start", "set the stage for"],
    "foster a culture of": ["encourage", "promote", "develop"],
    "navigating the landscape": ["understanding the situation", "understanding the field", "dealing with the area"],
    "a testament to": ["proof of", "shows", "demonstrates", "evidence of"],
    "exploring new frontiers": ["exploring new areas", "exploring new ideas", "innovating"],
    "hold promise": ["looks promising", "could be useful", "shows potential"],
    "implications are profound": ["has major effects", "is very significant", "has deep consequences"],
    "it remains to be seen": ["we don't know yet", "time will tell", "it's unclear"],
    "it serves as a stepping stone": ["it's a step towards", "it helps achieve"],
    "mark a significant step forward": ["is a big step forward", "is major progress"],
    "represents a significant milestone": ["is a major milestone", "is a key achievement"],
    "significant strides": ["major progress", "big improvements", "advances"],
    "unleashing the potential": ["using the potential", "enabling", "developing"],
    "unlocking the power": ["using the power", "enabling", "accessing"],
    "designed to enhance": ["designed to improve", "made to improve"],
    "in today's digital age": ["today", "now", "currently"], // Cliché
    "game changer": ["major change", "big improvement", "significant innovation"], // Cliché
    "thought leader": ["expert", "specialist", "pioneer", "innovator"], // Jargon
    "deep dive": ["detailed look", "in-depth analysis", "thorough examination"], // Jargon
    "value-add": ["benefit", "advantage", "added value"], // Jargon
    "low-hanging fruit": ["easy wins", "simple tasks", "quick gains"], // Jargon
    "quick wins": ["easy successes", "quick gains", "initial results"], // Jargon
    "best practices": ["good methods", "standards", "guidelines", "proven techniques"], // Jargon
    "customer-centric": ["focused on customers", "user-focused"], // Jargon
    "data-driven": ["based on data", "informed by data", "analytical"], // Jargon
    "results-oriented": ["focused on results", "goal-oriented", "performance-driven"], // Jargon
    "holistic approach": ["overall approach", "complete approach", "integrated view"], // Jargon
    "seamless integration": ["smooth connection", "easy integration", "flawless combination"], // Jargon
    "user journey": ["user experience", "how users interact", "user path"], // Jargon
    "touch base": ["contact", "check in", "connect briefly"], // Jargon
    "circle back": ["follow up", "discuss later", "revisit"], // Jargon
    "reach out": ["contact", "get in touch with"], // Jargon
    "pivot": ["change direction", "adapt", "shift focus"], // Jargon
    "agile": ["flexible", "adaptable", "quick", "responsive"], // Jargon
    "onboarding": ["introduction", "training", "integration", "orientation"], // Jargon
    "offboarding": ["departure process", "exit procedure"], // Jargon
    "bandwidth": ["capacity", "time", "ability", "resources"], // Jargon
    "drill down": ["examine closely", "analyze details", "investigate further"], // Jargon
    "run it up the flagpole": ["suggest it", "propose it", "test the idea"], // Jargon
    "take it to the next level": ["improve it", "advance it", "enhance it further"], // Cliché
    "move the needle": ["make a difference", "have an effect", "change things"], // Jargon
    "core competency": ["main skill", "key strength", "primary expertise"], // Jargon
    "value proposition": ["main benefit", "value offered", "key advantage"], // Jargon
    "win-win": ["mutually beneficial", "good for both sides"], // Cliché
    "out-of-the-box thinking": ["creative thinking", "new ideas", "unconventional approach"], // Cliché
    "blue-sky thinking": ["idealistic thinking", "brainstorming freely", "unrestricted ideas"], // Jargon
    "mission-critical": ["essential", "vital", "crucial", "key"], // Jargon

    // Add hundreds more here... this is still just a fraction of 5000+

    // Remember this is created by https://github.com/Destructive-Entity ;)
};
// --- END OF LARGE REPLACEMENT LIST ---


// --- Global variable to store found suggestions ---
let currentSuggestions = [];

// --- Function to Find Suggestions ---
function findSuggestions() {
    const text = inputText.value;
    currentSuggestions = [];
    suggestionsListDiv.innerHTML = '';
    outputText.value = text; // Show original text in output initially
    applyChangesButton.style.display = 'none';
    suggestionsStatusP.textContent = '';
    statusP.textContent = 'Finding suggestions...';

    if (!text.trim()) {
        statusP.textContent = 'Input text is empty.';
        return;
    }

    let suggestionIdCounter = 0;
    let foundCount = 0;

    // Iterate through each phrase in our replacement map
    for (const phraseToFind in wordReplacements) {
        // Make sure the value is actually an array and not empty
        const replacementsArray = wordReplacements[phraseToFind];
        if (!Array.isArray(replacementsArray) || replacementsArray.length === 0) {
            console.warn(`Skipping invalid entry for "${phraseToFind}"`);
            continue; // Skip this entry if it's not a valid array
        }

        try {
            // Use RegExp for case-insensitive, whole-word matching
            // Create regex safely, escaping special characters in the phrase
            const escapedPhrase = phraseToFind.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`\\b${escapedPhrase}\\b`, 'gi');
            let match;

            while ((match = regex.exec(text)) !== null) {
                foundCount++;
                const originalPhrase = match[0];
                const index = match.index;
                const contextSnippet = getContextSnippet(text, index, originalPhrase.length);

                currentSuggestions.push({
                    id: `suggestion-${suggestionIdCounter++}`,
                    originalPhrase: originalPhrase,
                    replacements: replacementsArray, // Store the whole array of options
                    index: index,
                    length: originalPhrase.length,
                    context: contextSnippet
                });
            }
        } catch (e) {
            console.error(`Regex error for phrase: ${phraseToFind}`, e);
        }
    }

    // Sort suggestions by index
    currentSuggestions.sort((a, b) => a.index - b.index);

    statusP.textContent = `Search complete. Found ${foundCount} potential matches.`;
    displaySuggestions();
}

// --- Helper Function to Get Context Snippet ---
function getContextSnippet(text, index, length, contextLength = 30) { // Slightly longer context
    const start = Math.max(0, index - contextLength);
    const end = Math.min(text.length, index + length + contextLength);
    const prefix = text.substring(start, index);
    const match = text.substring(index, index + length);
    const suffix = text.substring(index + length, end);
    const prefixEllipsis = start > 0 ? '...' : '';
    const suffixEllipsis = end < text.length ? '...' : '';
    // Escape HTML in context to prevent issues, except for our markers
    const escapeHtml = (unsafe) => unsafe.replace(/[&<>"]/g, (m) => ({ '&amp;': '&amp;', '&lt;': '&lt;', '&gt;': '&gt;', '&quot;': '&quot;' }[m]));
    // Re-inject bold markers AFTER escaping the rest
    let safeContext = `${prefixEllipsis}${escapeHtml(prefix)}<strong>${escapeHtml(match)}</strong>${escapeHtml(suffix)}${suffixEllipsis}`;
    return safeContext;
}


// --- Function to Display Suggestions in the UI ---
function displaySuggestions() {
    suggestionsListDiv.innerHTML = ''; // Clear previous suggestions always

    if (currentSuggestions.length === 0) {
        suggestionsStatusP.textContent = 'No specific phrases found matching the known list.';
        applyChangesButton.style.display = 'none';
        return;
    }

    suggestionsStatusP.textContent = `Found ${currentSuggestions.length} suggestions. Review and select changes:`;

    currentSuggestions.forEach((suggestion, i) => { // Use index i for data attribute
        const itemDiv = document.createElement('div');
        itemDiv.className = 'suggestion-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = suggestion.id;
        checkbox.checked = true; // Default checked
        checkbox.setAttribute('data-suggestion-index', i); // Use array index

        const contentDiv = document.createElement('div');
        contentDiv.className = 'suggestion-content';

        const contextP = document.createElement('p');
        contextP.className = 'suggestion-context';
        // Display context with bold markers converted to <strong>
        contextP.innerHTML = suggestion.context.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');


        const changeP = document.createElement('p');
        changeP.className = 'suggestion-change';
        // Display ONLY the first suggestion by default
        const firstSuggestion = suggestion.replacements[0] || "[Remove Phrase]"; // Handle empty array case - offer removal
        changeP.innerHTML = `Replace <strong>${suggestion.originalPhrase}</strong> <span class="arrow">→</span> <span>${firstSuggestion}</span>`;
        // TO DO LATER: Could add a dropdown here to select from suggestion.replacements array

        contentDiv.appendChild(contextP);
        contentDiv.appendChild(changeP);

        itemDiv.appendChild(checkbox);
        itemDiv.appendChild(contentDiv);

        suggestionsListDiv.appendChild(itemDiv);
    });

    applyChangesButton.style.display = 'inline-flex';
}


// --- Function to Apply Selected Changes ---
function applySelectedChanges() {
    let modifiedText = inputText.value;
    const checkboxes = suggestionsListDiv.querySelectorAll('input[type="checkbox"]');
    const changesToApply = [];

    checkboxes.forEach(cb => {
        if (cb.checked) {
            const suggestionIndex = parseInt(cb.getAttribute('data-suggestion-index'), 10);
            // Ensure the index is valid before pushing
            if (!isNaN(suggestionIndex) && suggestionIndex >= 0 && suggestionIndex < currentSuggestions.length) {
                 changesToApply.push(currentSuggestions[suggestionIndex]);
            } else {
                console.warn("Invalid suggestion index found on checkbox:", cb.id);
            }
        }
    });

    if (changesToApply.length === 0) {
        suggestionsStatusP.textContent = 'No changes were selected to apply.';
        outputText.value = inputText.value; // Show original if nothing selected
        statusP.textContent = "No changes applied.";
        return;
    }

    // IMPORTANT: Sort changes by index DESCENDING
    changesToApply.sort((a, b) => b.index - a.index);

    statusP.textContent = `Applying ${changesToApply.length} selected changes...`;
    let appliedCount = 0;

    // Apply changes from the end backwards
    changesToApply.forEach(change => {
        // Use the FIRST suggestion from the replacements array
        // If the first suggestion is "", it means remove the phrase
        const replacementText = (Array.isArray(change.replacements) && change.replacements.length > 0) ? change.replacements[0] : ""; // Default to empty string (removal)

        // Double check indices before applying, though sorting DESC should prevent most issues
        if (change.index >= 0 && (change.index + change.length) <= modifiedText.length) {
             modifiedText = modifiedText.substring(0, change.index) +
                            replacementText +
                            modifiedText.substring(change.index + change.length);
             appliedCount++;
        } else {
            console.error("Skipping change due to index mismatch:", change);
        }
    });

    // Final cleanup
    modifiedText = modifiedText.replace(/\s{2,}/g, ' '); // Collapse multiple spaces
    modifiedText = modifiedText.replace(/\s+([?.!,:;])/g, '$1'); // Remove space before punctuation
    modifiedText = modifiedText.trim(); // Trim leading/trailing whitespace

    outputText.value = modifiedText;
    statusP.textContent = `Applied ${appliedCount} changes.`;
    suggestionsStatusP.textContent = 'Selected changes applied to the "Modified Text" area. Review the result.';
}


// --- Event Listeners ---
findSuggestionsButton.addEventListener('click', findSuggestions);
applyChangesButton.addEventListener('click', applySelectedChanges);

// --- Initial setup ---
statusP.textContent = "Ready. Paste text and click 'Find Suggestions'."; // Initial message