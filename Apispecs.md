# ApiSPECS pembukuan UMKM

## GET DATA ROLES

function:

```javascript
Api.getdata(table, search, perPage, startAfter);
```

variable:

```javascript
table = nama talble
search = string pencarian
perPage = limit data
startAfter = last data yang muncul
```

return :

```json
{
  "data": [
    {
      "id": "sbjajdh213h",
      "name": "Karyawan",
      "description": "Mengubah ..."
    },
    {
      "id": "sfg",
      "name": "Super Admin",
      "description": "Mengubah ..."
    },
    {
      "id": "saht324",
      "name": "Dokter",
      "description": "Mengubah ..."
    }
    ...
  ]
}
```

##
