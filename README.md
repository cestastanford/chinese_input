# Chinese Input

Studying the pathways of Chinese character input through QWERTY keyboards, a research collaboration between [Tom Mullaney](http://tsmullaney.com) and [Jason A. Heppler](http://jasonheppler.org).

1. Raw data from Google Spreadsheet is contained in the `_Segment.csv` files.
2. Prepared data is under `_textseg.csv`, which is what is loaded into Palladio.
3. Files in Palladio also depend on a `chinese_id` file, for linking the `chinese_id` column with the correct Chinese and Pinyin characters. **This is a necessary step for the topological sort in the visualization to work correctly.**

This repository exists mainly for the preparation and storage of data. Visualization is handled in the [Palladio path component](https://github.com/humanitiesplusdesign/palladio-path-component) repository.
