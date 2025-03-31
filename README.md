![image](https://github.com/user-attachments/assets/783a192c-70f8-4b5b-9a58-194cc7c88498)# Interactive AI Text Humanizer (Browser-Based)

**Access directly from

![GitHub Icon](https://img.shields.io/badge/Created%20By-Destructive--Entity-4f46e5?style=for-the-badge&logo=github)

This is a simple, client-side tool built with HTML, CSS, and JavaScript designed to help users identify and replace common phrases often found in AI-generated text, making it sound more natural and less robotic. It provides interactive suggestions that the user can review and approve before applying.

---

## Key Features

*   Analyzes input text for phrases defined in a customizable list within the JavaScript code.
*   Presents potential suggestions interactively, showing the original phrase in context.
*   Allows users to select which specific suggestions they want to apply using checkboxes.
*   Applies only the selected changes to generate the modified text.
*   Modern, responsive user interface built with vanilla HTML, CSS, and JS.
*   Runs entirely in the browser – no server, installations, or special permissions needed.

---

## How It Works (Important Limitations!) ⚠️

**This tool does *NOT* use Artificial Intelligence to detect AI writing.** It operates solely on a **predefined list of words and phrases** (`wordReplacements` object in `script.js`).

*   **Rule-Based Matching:** It only finds *exact matches* (case-insensitive) for the phrases currently present in its internal list. If an AI phrase isn't in the list, it won't be found.
*   **No Contextual Understanding:** The tool cannot understand the meaning, grammar, or nuances of the text. A suggested replacement (even if grammatically correct) might not always be the most appropriate choice for the specific context.
*   **Not Foolproof:** It will not catch all AI writing patterns, only those explicitly defined in its list. Sophisticated AI text or patterns not yet added to the list may not trigger any suggestions.
*   **User Review is ESSENTIAL:** This tool is designed as an *assistant*. The user **must** review each suggestion and decide if the change makes sense in context. Do not apply changes blindly.

---

## How to Use

1.  Clone or download this repository.
2.  Open the `index.html` file directly in your web browser.
3.  Paste the text you want to analyze into the "Input Text" box.
4.  Click the "**Find Suggestions**" button.
5.  Review the suggestions that appear below. Each suggestion has a checkbox (checked by default). **Uncheck** any changes you **do not** want to make.
6.  Click the "**Apply Selected Changes**" button.
7.  The revised text, with only the approved changes applied, will appear in the "Modified Text" box. Copy it from there.

---

## Customization & Improvement

The effectiveness of this tool **directly depends on the list of phrases it searches for.** You can significantly improve its usefulness by editing the `wordReplacements` object located near the top of the `script.js` file:

*   **Add More Phrases:** Add new keys (the AI phrase to find, in lowercase) and values (an array of suggested replacements).
    ```javascript
    const wordReplacements = {
        // ... existing entries ...
        "new ai phrase to find": ["good replacement", "another option"],
        "another common term": ["simpler version"]
    };
    ```
*   **Refine Replacements:** Improve the suggested replacements in the arrays for existing entries. The first item in the array (`[0]`) is used by default when applying changes.
*   **Consider Context:** Think about how phrases are used and provide replacements that are generally safer or more common.

---

## Technologies Used

*   HTML5
*   CSS3 (including Flexbox, Grid, CSS Variables)
*   Vanilla JavaScript (ES6+)

---

## Disclaimer

This tool is intended as a writing aid to help users revise text and become more aware of common AI writing patterns. It should **not** be used for academic dishonesty or to inappropriately circumvent plagiarism detection. Modified text still originates from its initial source, and the responsibility for the final content, its accuracy, and its ethical use rests solely with the user.

---

## Created By

**[Destructive-Entity](https://github.com/Destructive-Entity)**
