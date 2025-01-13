chrome.action.onClicked.addListener(() => {
    const width = 800;
    const height = 600;

    // Get the primary display's work area to calculate centered coordinates
    chrome.system.display.getInfo((displays) => {
        const primaryDisplay = displays.find((display) => display.isPrimary);

        if (!primaryDisplay) {
            console.error("No primary display found.");
            return;
        }

        const top = Math.round(
            primaryDisplay.workArea.height / 2 - height / 2
        );
        const left = Math.round(
            primaryDisplay.workArea.width / 2 - width / 2
        );

        chrome.windows.create({
            url: "add.html",
            type: "popup",
            width: width,
            height: height,
            top: top,
            left: left,
        });
    });
});
