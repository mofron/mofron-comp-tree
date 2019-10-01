# mofron-comp-tree
[mofron](https://mofron.github.io/mofron/) is module based frontend framework.

tree component for mofron

## Attention
 - 'title' is private. please use 'index' or 'text' parameter instead of 'title'

# Install
```
npm install mofron mofron-comp-tree
```

# Sample
```html
<require>
    <tag module="mofron-comp-tree">Tree</tag>
    <tag module="mofron-comp-text">Text</tag>
</require>

<script name=evt run=init>
console.log(evt2.text());
</script>

<Tree index="mofron" baseColor=#fafafa clickEvent=@evt speed=300>
    <Tree index="Component">
        <Tree>Button</Tree>
        <Tree>Header</Tree>
    </Tree>
    <Tree index="Event">
        <Tree>Click</Tree>
        <Tree>Drag</Tree>
    </Tree>
    <Tree index="Effect">
        <Tree>Fade</Tree>
        <Tree>Shadow</Tree>
    </Tree>
    <Tree index="Layout">
        <Tree>Grid</Tree>
        <Tree>Margin</Tree>
    </Tree>
</Tree>
```
# Parameter

|Simple<br>Param | Parameter Name | Type | Description |
|:--------------:|:---------------|:-----|:------------|
| | index | mixed | string: tree index string |
| | | | mofron-comp-text: tree index text component |
| | text | mixed | string: tree index string |
| | | | mofron-comp-text: tree index text component |
| | textSize | string (size) | text size |
| | clkconts | string | display component of object key that when this tree is clicked. |
| | switch | mofron-comp-switch | switch component |
| | clickEvent | function | function for click event |
| | | mixed | function parameter |
| | speed | number | folding speed (millisecond) |

