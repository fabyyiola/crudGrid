#crudGrid
This plugin is to make developers life easy when it comes to create a catalog to insert, update, delete records, the source is very simple, you just need to retrieve 
{
  rows:[val1,val2]
  ,columns:{
            col1:0
            ,col2:1
            }
  }



###Options:

- [source](https://jsfiddle.net/fabyyiola/mfjq6dce/4/): *json*
- [[mapping]](https://jsfiddle.net/fabyyiola/tvcLh3an/10/): *array*
  - dataField: *string*
  - colText: *string*
  - [visible: *bool*]
  - [width: *string*]
  - [html: *function(value)*]
  - [css: *string*]
  - [type: *string*]
  -  [addRow]
     - [defaultValue: *function()*|*bool*|*int*|*string*]
     - [enabled: *bool*]
- [[caseSensitive](https://jsfiddle.net/fabyyiola/dLvho5th/1/): *bool*]
- [addRow: *bool*]
- [editable: *bool*]
- [deletable: *bool*]
- [extraParamsOnSave: *function()*]
- [onRefresh: *function()*]
- [onSave: *function(values)*]
- [onUpdate: *function(values)*]
- [onDelete: *function(row)*]
  
