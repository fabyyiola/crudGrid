#crudGrid
This plugin is to make developers life easy when it comes to create a catalog to insert, update, delete records, the source is very simple, you just need to retrieve 

source = {
  rows:[val1,val2]
  ,columns:{
            col1:0
            ,col2:1
            }
  }

  
###Options:

- source: *{}*
- [Mapping]
  - [dataField: *string*]
  - [colText: *string*]
  - [visible: *bool*]
  -  [addRow]
     - [defaultValue: *function*|*bool*|*int*|*string*]
     - [enabled: *bool*]
  
