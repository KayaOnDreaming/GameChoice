$(document).ready(function(){
  var id = window.location.hash;
  id = id ? id.replace('#', '') : 1;
  id = typeof(story_data[id]) ? id : 1;
  
  var data = story_data[id];

  $('.jq_series_name').text(data.series_name);
  $('.jq_storyline_name').text(data.storyline_name);

    // chat_link
    if(data.chat_link && data.chat_link.length > 0) {
      var html = '<a href="' + data.chat_link + '" type="button" class="btn btn-default">場外聊天噗</a><br/><br/>';
      $('.jq_chat_link').append(html);
    }
    
  $.each(data.question_list, function(qidx, qelem) {
    var jqQElem = $(template);

    // title
    jqQElem.find('.jq_question_id').text('命運選擇 ' + qelem.question_id);

    // story_content
    if(qelem.story_content && qelem.story_content.length > 0) {
      var html = '【劇情】<br/>' + qelem.story_content.change2html();
      jqQElem.find('.jq_story_content').html(html);
    }

    // question
    if(qelem.question && qelem.question.length > 0) {
      var html = '<br/>【問題】' + qelem.question.change2html();
      jqQElem.find('.jq_question').html(html);
    }

    // answer_list
    if(data.answer_list && data.answer_list.length > 0) {
      var answers = $.grep(data.answer_list, function(gitem) {
        return gitem.question_id == qelem.question_id;
      });

      if(answers.length > 0){
        var vote_count_array = $.map(answers, function(aitem) {
          return aitem.vote_count;
        });
        var max_vote_count = Math.max(...vote_count_array);

        var html = '【選項】<br/><ul>';
        $.each(answers, function(aidx, aelem) {
          if(aelem.question_id === qelem.question_id) {
            html += (aelem.vote_count == max_vote_count ? '<li class="text-primary">' : '<li>');
            html += aelem.option_content + '［旅人投票數：' + aelem.vote_count + '］</li>';
          }
        });
        html += '</ul>';
        jqQElem.find('.jq_answer_list').html(html);
      }
    }

    // notes
    if(qelem.notes && qelem.notes.length > 0) {
      var html = '【問題備註】<br/><ul>';
      $.each(qelem.notes, function(nidx, nelem) {
        html += '<li>' + nelem + '</li>';
      });
      html += '</ul>';
      jqQElem.find('.jq_notes').html(html);
    }

    // sequel_content
    if(qelem.sequel_content && qelem.sequel_content.length > 0) {
      var html = '<br/>【後續】<br/>' + qelem.sequel_content.change2html();
      jqQElem.find('.jq_sequel_content').html(html);
    }

    $('.jq_question_list').append(jqQElem);

    // plurk_link
    jqQElem.find('.jq_plurk_link').attr('href', qelem.plurk_link);
  });

});

(function ( $ ) { 
  String.prototype.change2html = function() { 
    return this.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  };
}( jQuery ));