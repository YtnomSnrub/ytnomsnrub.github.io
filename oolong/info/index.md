---
title: Oolong
---

{% include content/oolong-info.html title="<h1>Oolong</h1>" %}

## How to Use Oolong

Generating words with Oolong works in two stages: loading your input data, and generating words.

### Loading Data

There are three ways to load data into Oolong:

- Directly from a custom text input.
- Using a data file from your local system.
- Selecting a preset from the preset menu.

#### Data Options

There are also some options to look at before loading your data:

- Order, which is how many previous values to look at when generating the next value and is explained in detail in the guide [Markov Chains in Oolong](/oolong/info/markov-chains).
- Data Type, which determines how to break up data. All presets and most data files are formatted into lines, while words and sentences can work well with raw text.

Changing these options will require you to reload your data before they take effect when generating new words.

### Generating Words

Once you've loaded your data, you can generate random words based on the input data you've selected. You can select "Generate" to generate new words, or use the "Reset" and "Next Step" buttons to step through the generation process one step at a time.

## How it Works

You can step through the process of generating new words in Oolong by pressing the "Next Step" button in the generation panel near the bottom of the page. This will show a table with the current key and the chance of picking each letter next.

If you'd like to know more about Markov chains, what they are, and how Oolong uses them to randomly generate words, there's a simple explanation linked below that has some step-by-step examples of how words can be built using Markov chains.

- [Markov Chains in Oolong](/oolong/info/markov-chains)
