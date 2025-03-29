# Life in Weeks - Firefox New Tab Extension

A Firefox extension that replaces your new tab page with a visual representation of your life in weeks. Inspired by the concept from [Wait But Why's "Your Life in Weeks"](https://waitbutwhy.com/2014/05/life-weeks.html).

## Features

- Asks for your name and date of birth on first run
- Calculates how many weeks you've lived and how many remain until age 80
- Displays a grid visualization with weeks you've lived (in red) and weeks remaining (in green)
- Shows year labels for easier reference
- Provides a reset option to change your information
- Mobile-responsive design

## Installation Instructions

### Temporary Installation (for Development)

1. Open Firefox and enter `about:debugging` in the address bar
2. Click on "This Firefox" in the left sidebar
3. Click on "Load Temporary Add-on..."
4. Navigate to the `extension` folder and select the `manifest.json` file
5. The extension will be loaded temporarily until Firefox is restarted

### Permanent Installation

To install the extension permanently, you'll need to package it and submit it to the Firefox Add-ons store. Here's how to package it:

1. Zip the contents of the `extension` folder (not the folder itself)
2. Rename the zip file to `life-in-weeks.xpi`
3. Go to `about:addons` in Firefox
4. Click the gear icon and select "Install Add-on From File..."
5. Select your `life-in-weeks.xpi` file

## Development

### Project Structure

```
extension/
├── css/
│   └── styles.css
├── icons/
│   ├── icon-48.png
│   └── icon-96.png
├── js/
│   └── app.js
├── manifest.json
└── newtab.html
```

### Creating Icons

Before submitting to the Firefox Add-ons store, you'll need to replace the placeholder icon files with actual PNG images.

## License

[MIT License](LICENSE)

## Credits

- Inspired by [Wait But Why's "Your Life in Weeks"](https://waitbutwhy.com/2014/05/life-weeks.html) 