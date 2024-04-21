[![npm](https://img.shields.io/npm/v/@konsumation/db-level.svg)](https://www.npmjs.com/package/@konsumation/db-level)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![Typed with TypeScript](https://flat.badgen.net/badge/icon/Typed?icon=typescript\&label\&labelColor=blue\&color=555555)](https://typescriptlang.org)
[![bundlejs](https://deno.bundlejs.com/?q=@konsumation/db-level\&badge=detailed)](https://bundlejs.com/?q=@konsumation/db-level)
[![downloads](http://img.shields.io/npm/dm/@konsumation/db-level.svg?style=flat-square)](https://npmjs.org/package/@konsumation/db-level)
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fkonsumation%2Fdb-level%2Fbadge\&style=flat)](https://actions-badge.atrox.dev/konsumation/db-level/goto)
[![Styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Known Vulnerabilities](https://snyk.io/test/github/konsumation/db-level/badge.svg)](https://snyk.io/test/github/konsumation/db-level)

# konsum-db

timeseries database on leveldb

# example

```js
import levelup from "levelup";
import leveldown from "leveldown";

import { Master, Category } from "konsum-db";

async function example() {
 // open database
 const db = await levelup(leveldown("example.db"));
 const master = await Master.initialize(db);

 // create category named EV
 const ev = new Category("EV", master, { unit: "kWh" });
 await ev.write(master.db);
 
 // write entry
 await ev.writeValue(db, Date.now(), 77.34);
}

example();
```

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

*   [LevelCategory](#levelcategory)
    *   [Parameters](#parameters)
    *   [Properties](#properties)
    *   [write](#write)
        *   [Parameters](#parameters-1)
    *   [key](#key)
    *   [meters](#meters)
        *   [Parameters](#parameters-2)
    *   [entries](#entries)
        *   [Parameters](#parameters-3)
*   [MASTER](#master)
*   [CATEGORY\_PREFIX](#category_prefix)
*   [VALUE\_PREFIX](#value_prefix)
*   [METER\_PREFIX](#meter_prefix)
*   [NOTE\_PREFIX](#note_prefix)
*   [LevelMaster](#levelmaster)
    *   [Properties](#properties-1)
    *   [write](#write-1)
        *   [Parameters](#parameters-4)
    *   [close](#close)
    *   [categories](#categories)
        *   [Parameters](#parameters-5)
    *   [initialize](#initialize)
        *   [Parameters](#parameters-6)
*   [LevelMeter](#levelmeter)
    *   [Parameters](#parameters-7)
    *   [Properties](#properties-2)
    *   [notes](#notes)
        *   [Parameters](#parameters-8)
    *   [values](#values)
        *   [Parameters](#parameters-9)
    *   [key](#key-1)
*   [LevelNote](#levelnote)
    *   [key](#key-2)
*   [secondsAsString](#secondsasstring)
    *   [Parameters](#parameters-10)
*   [LevelValue](#levelvalue)
    *   [key](#key-3)

## LevelCategory

**Extends Category**

Value Category.

### Parameters

*   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** category name
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;

    *   `options.description` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;
    *   `options.unit` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** physical unit like kWh or m3
    *   `options.fractionalDigits` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** display precission

### Properties

*   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** category name
*   `description` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;
*   `unit` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** physical unit
*   `fractionalDigits` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** display precission

### write

*   **See**: {key}

Writes object into database.
Leaves all other entries alone.

#### Parameters

*   `db` **ClassicLevel**&#x20;

### key

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;

### meters

Get Meters of the category.

#### Parameters

*   `db` **ClassicLevel**&#x20;
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?**&#x20;

    *   `options.gte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** from name
    *   `options.lte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** up to name
    *   `options.reverse` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?** order

Returns **AsyncIterable\<Meter>**&#x20;

### entries

Get categories.

#### Parameters

*   `db` **ClassicLevel**&#x20;
*   `gte` **([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [undefined](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined))** lowest name (optional, default `"\u0000"`)
*   `lte` **([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [undefined](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined))** highst name (optional, default `"\uFFFF"`)

Returns **AsyncIterable\<Category>**&#x20;

## MASTER

Prefix of the master record

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## CATEGORY\_PREFIX

Prefix of the categories.
Will be followed by the category name

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## VALUE\_PREFIX

Prefix of the values.
Will be followed by the category name

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## METER\_PREFIX

Prefix of the meters.
Will be followed by the category name

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## NOTE\_PREFIX

Prefix of the notes.
Will be followed by the category name

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## LevelMaster

**Extends Master**

Master record.
Holds schema version.

### Properties

*   `schemaVersion` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;

### write

*   **See**: {key}

Writes object into database.
Leaves all other entries alone.

#### Parameters

*   `db` **ClassicLevel**&#x20;

### close

Close the underlaying database.

### categories

List Categories.

#### Parameters

*   `context` &#x20;
*   `gte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?**&#x20;
*   `lte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?**&#x20;

### initialize

Initialize database.
checks/writes master record.

#### Parameters

*   `directory` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<Master>**&#x20;

## LevelMeter

**Extends Meter**

Meter

### Parameters

*   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** meter name
*   `category` **Category**&#x20;
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;

    *   `options.description` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;
    *   `options.unit` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** physical unit like kWh or m3
    *   `options.fractionalDigits` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** display precission

### Properties

*   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** category name
*   `description` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;
*   `unit` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** physical unit
*   `fractionalDigits` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** display precission

### notes

List assigned Notes.

#### Parameters

*   `db` **any**&#x20;
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?**&#x20;

Returns **AsyncIterable<[LevelNote](#levelnote)>**&#x20;

### values

Get values of the meter.

#### Parameters

*   `db` **any**&#x20;
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?**&#x20;

    *   `options.gte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** time of earliest value
    *   `options.lte` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** time of latest value
    *   `options.reverse` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?** order

Returns **AsyncIterable<{value: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), date: [Date](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date)}>**&#x20;

### key

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;

## LevelNote

**Extends Note**

Hints placed on a category at a specific time.

### key

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;

## secondsAsString

Format seconds as string left padded with '0'.

### Parameters

*   `seconds` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** seconds since epoch

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** padded seconds

## LevelValue

**Extends Value**

Hints placed on a category at a specific time.

### key

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;
