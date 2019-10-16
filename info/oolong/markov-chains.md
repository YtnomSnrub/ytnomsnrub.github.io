# Markov Chains in Oolong

Oolong uses Markov chains to randomly generate words. This is the same probability model that many predictive services are based on, such as the word prediction on your phone's keyboard. The underlying concept of Markov chains is simple: the probability of every possible next value can be determined from the current value, but this section will go more into detail about how Oolong uses Markov chains. You can also generate words step-by-step in Oolong using the "Next Step" button if you'd like a better understanding of the process.

## Example 1

First, consider a very simple case: an Markov chain built using a two input words with an order of 1, meaning to only look at the last letter when deciding the next letter. In this example, let's use the words `hello` and `oolong`. If you want to try this in Oolong make sure to set your order to 1 and your data type to "Words", then type `hello oolong` into the text input and select the "Update from Text" button.

1. One word starts with an `h`, while the other starts with an `o`, so there is a 1⁄2 chance of choosing an `h` first, and a 1⁄2 chance of choosing an `o`. For this example, we'll start with `h`.
2. Every time there's an `h`, it is followed by an `e`, so there is a 100% chance that the next letter in our word is an `e`.
3. Our current word is `he`, but since this is a Markov chain with an order of 1 we only look at the last letter. Every `e` is followed by an `l`, so the next letter in our word is `l`.
4. There are three `l`s in our input: one is followed by another `l` while the other two are followed by an `o`, so there is a 1⁄3 chance of the next letter being an `l` and a 2⁄3 chance of the next letter being an `o`. We'll go with the more likely option and choose `o`.
5. Again, there are three `o`s in our input: one is followed by another `o`, one is followed by an `n`, and the word ends after the other one. This gives a 1⁄3 chance of the next letter being `o`, a 1⁄3 chance to be `n`, and a 1⁄3 chance for the word to end here. Let's choose `n`.
6. Every `n` is followed by a `g`, so the next letter will be `g`.
7. Every time there is a `g`, the word ends, so there is a 100% chance that our word will end.
8. This gives us our final word: `helong`.

## Example 2

Let's try another example, this time with an order of 3 using the words `tree`, `eels`, and `reeler`. Remember to set the order to 3 and the data type to "Words" if you want to step through this in Oolong, then type `tree eels reeler` into the text input and select "Update from Text".

1. There is a 1⁄3 chance to start with each of `t`, `e`, or `r`. Let's pick `r` for this example.
2. The order is 3, but we only have one letter in our word, so we should still only consider the starts of words. The only time there is an `r` at the start of a word, it is followed by an `e`, so our next letter is `e`. Note that we ignore the `r` at the end of `reeler`.
3. Now we have two letters, but an order of 3, so like last step we will still only look at the start of words. The only time `re` occurs at the start of a word is in `reeler`, so the next letter will be an `e`.
4. Currently, we have `ree`. This is three characters, so we can now look beyond the start of words. `ree` occurs once in `tree` and once in `reeler`, so there is a 1⁄2 chance of the word ending and a 1⁄2 chance of the next letter being `l`. Let's choose `l`.
5. Our word is now `reel`, which is longer than our order of 3, so we only look at the last three letters: `eel`. `eel` occurs in `eels` and `reeler`, meaning that there is a 1⁄2 chance of our next letter being an `s` and a 1⁄2 chance of the next letter being an `e`. Let's choose `s`.
6. Finally, we look at the last 3 letters of `reels`, which gives us `els`. This only occurs at the end `eels`, so our word has a 100% chance of ending.
7. This gives us our final word: `reels`.

## Summary

These examples are brief, and just designed to show the concept of Markov chains and how they can be used to randomly generate words. Oolong typically works on inputs of thousands of words, where there are many more possibilities and where manually working out Markov chains would be a huge amount of work.

Some other things worth noting when using Oolong are that you can never have a unique word with fewer letters than the order. Setting the order too high will result in words being either similar or identical to words in the data source, while a low order will produce very random and nonsense words have little resemblance to the input. Finding a good balance may take a few tries, but starting with and order between 3 and 6 will usually produce good results.
