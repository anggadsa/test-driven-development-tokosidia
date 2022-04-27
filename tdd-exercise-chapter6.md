# `TDD Exercise`

## `Directions`
***
- Buatlah tiga table, yaitu `clients`, `brands`, `client_types`
***
- Terkait table `clients`:
    - Memiliki attributes: 
        1. `legal_name` yang wajib berupa string berisikan huruf saja. 
        2. `npwp_number` yang wajib berupa string berisikan angka saja. 
        3. `address` yang berupa string.
        4. `client_type_id` yang berupa integer.
    - Setiap `client` memiliki satu `client_type`.
    - Setiap `client` dapat memiliki banyak `brand`.
    - Sebaliknya setiap `client_type` dapat berada di banyak `client` (Perhatikan baik-baik apakah perlu client_type dibuatkan asosiasi kepada `client` atau tidak, gunakan yang dibutuhkan saja.),
***
- Terkait table `brands`:
    - Memiliki attributes: 
        1. `name` berupa string yang wajib berisikan huruf saja. 
        2. `is_big_brand` berupa boolean saja. 
        3. DAN attribut lain yang *`MUNGKIN SAJA`* berkaitan dengan relasi.
***
- Terkait table `client_types`:
    - Memiliki attributes: 
        1. `name` berupa string.
***

- Buatlah CRUD dan TESTING untuk table `clients` & `brands`.

***
## `Restrictions`
- Wajib menggunakan Sequelize.
- Wajib menggunakan Jest dan Supertest untuk testing.
- Wajib melakukan integration testing.
- Wajib memiliki 2 positive tests dan 3 negative tests untuk setiap controller.