```
## Audio Player Example
{{< audio 
    src="/path/to/audio.mp3" 
    title="Amazing Track" 
     cover="/path/to/cover.jpg" 
/>}}

## Video Player Example
{{< video 
    src="/path/to/video.mp4" 
    poster="/path/to/poster.jpg" 
    title="Incredible Video" 
/>}}

## YouTube Embed
{{< youtube id="dQw4w9WgXcQ" title="Amazing Video" >}}

## GitHub Gist
{{< gist username/gistid >}}
{{< gist username/gistid filename.js >}}

## Download Button
{{< download 
    href="/path/to/file.pdf" 
    text="Download PDF" 
    size="large" 
    variant="primary" 
>}}

## Code Block
{{< code lang="javascript" title="Example Function" > ```javascript
function exampleFunction() {
  console.log("This is an example function.");
}
}} 

## Tooltip Example
{{< tooltip text="This is a tooltip!">}}
Hover over me!
{{</tooltip>}}

## Alert Example
{{< alert type="success">}}
Your changes have been saved successfully!
{{</alert>}}
```
