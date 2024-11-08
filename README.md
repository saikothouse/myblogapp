## Example of Using Shortcodes

### Audio Player
{{< audio src="/path/to/audio.mp3" title="My Favorite Song" cover="/path/to/cover.jpg" />}}

### Video Player
{{< video src="/path/to/video.mp4" poster="/path/to/poster.jpg" title="My Amazing Video" />}}

### YouTube Embed
{{< youtube id="dQw4w9WgXcQ" title="Incredible Video" />}}

### GitHub Gist
{{< gist username/gistid />}}

### Download Button
{{< download href="/path/to/file.pdf" text="Download PDF" size="large" variant="primary" />}}

### Code Block
{{< code lang="javascript" title="Example Function" >}}
function exampleFunction() {
  console.log("This is an example function.");
}
{{</code>}}

### Tooltip Example
{{< tooltip text="This is a tooltip!">}}Hover over me!{{</tooltip>}}

### Alert Example
{{< alert type="success">}}Your changes have been saved successfully!{{</alert>}}

### Quote Example
{{< quote text="The only limit to our realization of tomorrow is our doubts of today." author="Franklin D. Roosevelt" />}}

### Card Example
{{< card title="Card Title" content="This is a brief description of the card content." image="/path/to/image.jpg" />}}

### List Example
{{< list items={["Item 1", "Item 2", "Item 3"]} ordered={false} />}}

### Progress Bar Example
{{< progressBar progress={75} />}}

### Notification Example
{{< notification message="This is an info notification." type="info" />}}
