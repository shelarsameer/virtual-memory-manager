function optimal() {
    let f = parseInt(document.getElementById('frames').value);
    let p = parseInt(document.getElementById('pages').value);
    let pages = [];
    
    for (let i = 0; i < p; i++) {
        let input = prompt("Enter page number:");
        pages.push(parseInt(input));
    }

    let frame = new Array(f).fill(-1);
    let output = "";
    let pageHit = 0;

    for (let i = 0; i < p; i++) {
        let page = pages[i];
        let flag = true;

        // Check if the page is already in the frame
        for (let j = 0; j < f; j++) {
            if (frame[j] === page) {
                flag = false;  // Page hit
                pageHit++;
                break;
            }
        }

        // If the page is not found in the frame
        if (flag) {
            let indexToReplace = -1;

            // Find an empty frame
            for (let j = 0; j < f; j++) {
                if (frame[j] === -1) {
                    indexToReplace = j;
                    break;
                }
            }

            // If no empty frame, find the optimal page to replace
            if (indexToReplace === -1) {
                let farthest = -1;
                for (let j = 0; j < f; j++) {
                    let nextUse = pages.indexOf(frame[j], i + 1);
                    if (nextUse === -1) {
                        indexToReplace = j;  // If it's not used again, replace it
                        break;
                    }
                    if (nextUse > farthest) {
                        farthest = nextUse;
                        indexToReplace = j;
                    }
                }
            }

            frame[indexToReplace] = page;  // Replace the page
        }

        // Display current frame status
        output += "Frame: " + frame.join(" ") + "\n";
    }

    output += "Number of page hits: " + pageHit;
    document.getElementById('output').innerText = output;
}
