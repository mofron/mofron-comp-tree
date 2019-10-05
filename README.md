# mofron-comp-tree
[mofron](https://mofron.github.io/mofron/) is module based frontend framework.

tree component for mofron


# Install
```
npm install mofron mofron-comp-tree
```

# Sample
```html
<require>
    <tag module="mofron-comp-tree">Tree</tag>
</require>

<script run=init name=evt>
console.log(evt2.index());
</script>

<Tree baseColor=#fafafa title="mofron" clickEvent=@evt>
    <param>
        <ttlhei>(0.5rem,0.4rem)</ttlhei>
        <speed>500</speed>
    </param>

    <Tree title="Component" elmhei=0.3rem>
        <Tree>Button</Tree>
        <Tree>Header</Tree>
    </Tree>
    <Tree title="Event" elmhei=0.3rem>
        <Tree>Click</Tree>
        <Tree>Drag</Tree>
    </Tree>
</Tree>
```
# Parameter

|Simple<br>Param | Parameter Name | Type | Description |
|:--------------:|:---------------|:-----|:------------|
|◯| title | mixed | string: tree text |
| | | | component: tree text component |
| | index | mixed | string: tree index string |
| | | | mofron-comp-text: tree index text component |
| | ttlhei | string (size) | title height |
| | | string (size) | element title height |
| | elmhei | string (size) | element title height |
| | switch | mofron-comp-switch | switch component |
| | clickEvent | function | function for click event |
| | | mixed | function parameter |
| | speed | number | folding speed (millisecond) |
| | height | string (size) | tree height |
| | | object | option |

