(function () {
    'use strict';
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivId = document.getElementById('tweet-area');

    /**
     * 指定した要素の子要素をすべて削除する。コメントを追加
     * @param (HTML Element) element HTML の要素
     */
    function removeAllChildren(element) {
        while (element.firstChild) { // 子要素がある限り削除
            element.removeChild(element.firstChild);
        }
    }

    assessmentButton.onclick = function () {
        const userName = userNameInput.value;
        if (userName.length == 0) { // 名前が空の時は処理を終了する
            return;
        }
        // 診断結果表示エリアの作成
        removeAllChildren(resultDivided);
        const header = document.createElement('h3');
        header.innerText = '診断結果';
        resultDivided.appendChild(header);
        const result = assessment(userName);

        const paragraph = document.createElement('p');
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);
        // TODO ツイートエリアの作成        
        removeAllChildren(tweetDivId);
        const anchor = document.createElement('a');
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=あなたの良いところ&ref_src=twsrc%5Etfw&text='
        + encodeURIComponent(result);
        anchor.setAttribute('href', hrefValue);
        anchor.className = 'twitter-hashtag-button';
        anchor.innerText = '#あなたの良いところ';
        // anchor.text = 'hoge';
        anchor.related = 'tanaka_hisanori';
        tweetDivId.appendChild(anchor);
        twttr.widgets.load();
    }

    const answers = [
        '{userName}のいいところは声です。',
        '{userName}のいいところはまなざしです。',
        '{userName}のいいところは情熱です。',
        '{userName}のいいところは厳しさです。',
        '{userName}のいいところは知識です。',
        '{userName}のいいところはユニークさです。',
        '{userName}のいいところは用心深さです。',
        '{userName}のいいところは見た目です。',
        '{userName}のいいところは決断力です。優しさもグッド',
        '{userName}のいいところは思いやりです。',
        '{userName}のいいところは感受性です。',
        '{userName}のいいところは節度です。',
        '{userName}のいいところは好奇心です。',
        '{userName}のいいところは気配りです。',
        '{userName}のいいところはその全てです。',
        '{userName}のいいところは自制心です。'
    ];

    function assessment(userName) {
        /**
         * @param (string) userName　ユーザの名前
         * @return (string) 診断結果
         */
        let someOfCharCode = 0;

        for (var i = 0; i < userName.length; i++) {
            someOfCharCode += userName.charCodeAt(i);
        }
        const index = someOfCharCode % answers.length;
        let result = answers[index];

        result = result.replace(/{userName}/g, userName);

        return result;
    }
})();
