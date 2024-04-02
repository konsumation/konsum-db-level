import test from "ava";
import tmp from "tmp";
import { Readable } from "node:stream";
import { createWriteStream } from "node:fs";
import { LevelMaster, LevelCategory, LevelMeter } from "@konsumation/db-level";

test("LevelMeter value time 0", t =>
  t.is(
    new LevelMeter({ name: "cat" }).valueKey(0),
    "values.cat.000000000000000"
  ));

test("create Meter", async t => {
  const category = new LevelCategory({
    name: "CAT-1",
    unit: "kWh",
    fractionalDigits: 2
  });
  const meter = new LevelMeter({ name: "M1", category, serial: "1234567" });

  t.is(meter.key, "meters.CAT-1.M1");
  t.is(meter.name, "M1");
  t.is(meter.unit, "kWh");
  t.is(meter.fractionalDigits, 2);
  t.is(meter.serial, "1234567");
});

test("create Meter with unit", async t => {
  const category = new LevelCategory({ name: "CAT-1", fractionalDigits: 2 });
  const meter = new LevelMeter({
    name: "M1",
    category,
    serial: "1234567",
    unit: "m3",
    fractionalDigits: 3
  });

  t.is(meter.category, category);
  t.is(meter.name, "M1");
  t.is(meter.key, "meters.CAT-1.M1");
  t.is(meter.unit, "m3");
  t.is(meter.fractionalDigits, 3);
  t.is(meter.serial, "1234567");
});

test("Meter write / read", async t => {
  const master = await LevelMaster.initialize(tmp.tmpNameSync());

  const category = new LevelCategory({
    name: "CAT-1",
    unit: "kWh",
    fractionalDigits: 3
  });
  await category.write(master.context);

  for (let i = 0; i < 5; i++) {
    const meter = new LevelMeter({ name: `M-${i}`, category, serial: i });
    await meter.write(master.context);
  }

  const ms = [];

  for await (const m of LevelMeter.entriesWith(master.context, category)) {
    ms.push(m);
  }
  t.true(ms.length >= 5);
  t.is(ms[0].unit, "kWh");

  await master.close();
});

const SECONDS_A_DAY = 60 * 60 * 24;

test.only("values write / read", async t => {
  const dbf = tmp.tmpNameSync();
  const master = await LevelMaster.initialize(dbf);

  const category = new LevelCategory({ name: 'CAT-1', unit: "kWh" });
  await category.write(master.context);
  const meter = new LevelMeter({ name: `M-1`, category, serial: "123" });
  await meter.write(master.context);

  const first = Date.now();
  const firstValue = 77.34;
  let last = first;
  let lastValue = firstValue;

  for (let i = 0; i < 100; i++) {
    last = new Date(first + SECONDS_A_DAY * i);
    lastValue = firstValue + i;
    await meter.writeValue(master.context, last, lastValue);
  }

  let values = [];

  for await (const { value, time } of meter.values(master.context)) {
    values.push({ value, time });
  }

  console.log(values);
  t.true(values.length >= 100);
  t.deepEqual(values[0], { value: firstValue, time: first });

  /*
  values = [];
  for await (const { value, time } of meter.values(master.context, {
    gte: first + SECONDS_A_DAY * 99,
    reverse: true
  })) {
    values.push({ value, time });
  }
  t.log("VALUES", values);

  t.is(values.length, 1);
  t.deepEqual(values[0], { value: lastValue, time: last });
*/

  await master.close();
});

test("readStream", async t => {
  const dbf = tmp.tmpNameSync();
  const master = await LevelMaster.initialize(dbf);

  const c = new LevelCategory(`CAT-1`, master, {
    unit: "kWh",
    fractionalDigits: 2
  });
  await c.write(master.db);

  const first = Date.now();
  const firstValue = 77.34;
  let last = first;
  let lastValue = firstValue;

  for (let i = 0; i < 100; i++) {
    last = new Date(first + SECONDS_A_DAY * i).getTime();
    lastValue = firstValue + i;
    await c.writeValue(master.db, lastValue, last);
  }

  const stream = c.readStream(master.db, { reverse: true });

  // stream.pipe(process.stdout);

  const outFileName = tmp.tmpNameSync();
  //console.log(outFileName);
  stream.pipe(createWriteStream(outFileName, { encoding: "utf8" }));

  t.true(stream instanceof Readable);

  //master.close();
});

test("values delete", async t => {
  const dbf = tmp.tmpNameSync();
  const master = await LevelMaster.initialize(dbf);

  const c = new LevelCategory(`CAT-2`, master, { unit: "kWh" });
  await c.write(master.db);

  const first = Date.now();
  const firstValue = 77.34;
  let last = first;
  let lastValue = firstValue;

  for (let i = 0; i < 3; i++) {
    last = new Date(first + SECONDS_A_DAY * i).getTime();
    lastValue = firstValue + i;
    await c.writeValue(master.db, lastValue, last);
  }
  const ds = await c.getValue(master.db, first);
  t.is((await c.getValue(master.db, first)).toString(), "77.34");
  await c.deleteValue(master.db, first);

  t.is(await c.getValue(master.db, first), undefined);

  await master.close();
});
