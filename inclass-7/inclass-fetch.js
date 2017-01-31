// Inclass Fetch Exercise
// ======================
//
// Navigate to https://webdev-dummy.herokuapp.com/sample
//
// This endpoint returns a list of articles.  Your assignment is to
// write a function countWords that uses fetch() to query the endpoint,
// and return a map from the article id to the number of words in the
// article's text.
//
// Also write two "helper" functions that call this initial function.
//
// If there are any exceptions then fetch() will throw an error.
// Provide a "safe" version of the countWords function that always
// returns a map, which will be empty in the case of errors.
//
// Finally, write a function that returns the article id with the
// most number of words.
//
// Below I have provided you a template, you just need to fill in
// the implementation.
//
// Navigate to mocha-inclass-fetch.html to see if your implementation
// provides the expected results.
//
// Note that during the validation of the tests the browser will be
// directed to download invalid URLs which will result in error messages
// in the console:
//     GET https://webdev-dummy.herokuapp.com/badURL 404 (Not Found)
// this is expected and is not an error with your code.
//
(function(exports) {

    'use strict'

    function countWords(url) {
            var word=fetch(url)
            .then(r=>r.json())
            .then(r => {
                var wordmap={};
                var articles=r.articles;
                for(var i=0;i<articles.length;i++){// for each article
                    wordmap[articles[i]._id]=articles[i].text.split(" ").length;//count the words in the text
                }
                return wordmap;
                
            })
            .catch(function(error){//error
                throw(error);
            })
            return word;//return the promise

        throw new Error('Implement me!')
    }

    function countWordsSafe(url) {
        
        var wordsSafe=countWords(url)//count the words
                      .catch(function(error){//if error return an empty object
                      return []
                      })
        return wordsSafe;//return the promise
        throw new Error('Implement me!')
    }

    function getLargest(url) {
        var maxID=countWords(url)//count the words
        .then(r=>{
            var maxwords=0;
            var maxid="";
            for(var i in r)//find the largest 
            {
                if(r[i]>maxwords)
                {  
                    maxwords=r[i];
                    maxid=i;
                }

            }
            return maxid;
        })
        return maxID;//return the promise
        throw new Error('Implement me!')
    }


    exports.inclass = {
        author: "Wanyi Liu",//Wanyi Liu
        countWords, countWordsSafe, getLargest
    }

})(this);