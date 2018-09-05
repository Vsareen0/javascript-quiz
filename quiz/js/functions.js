$(document).ready(function(){

    let score = 0;
    let keep = 0;

	$("#run").on("click",function(event){
        event.preventDefault();
		/*$(".guidelines").replaceWith($(".quiz_area"));*/
		$(".guidelines").fadeOut();
		$(".quiz_area").css("display","block");
		$(".terminate").css("display","block");
	});
	
    /*Input validation*/
    $('.next').attr('disabled','disabled');
	$('input').on('change',function(event){
        event.preventDefault();
        let id = $(this).parent().parent().attr('id');
        var  val= $(this).val();  
        if(val !== ''){
            $('.next').removeAttr('disabled');
        }
    });
let array = [];
    /*Review Later */
    $('.review').click(function(event){
        event.preventDefault();
        let val = $(this).closest('div').attr('id');
        if(!array.includes(val)){
            array.push(val);
            $('.next').removeAttr('disabled');
        }
    });

	$('div.content:first-child').fadeIn();
    $(".next").click(function (event){
        event.preventDefault();
        var $thisParent = $(this).closest('div.content');
        $thisParent.fadeOut(100, function(){
            if ($thisParent.next('.content').length > 0) {
                $thisParent.next('.content').fadeIn();
                var curr = $(this).find($('.content > input')).val();
                $('.next').attr('disabled','disabled');
            }
        });
    });

   $('.finish').click(function(event){
        event.preventDefault();
        var radioValueMcq1 = $("input[name='mcq-1']:checked").val();
        var radioValueMcq2 = $("input[name='mcq-2']:checked").val();
        var fill1 = $("input[name='fill-1']").val();
        var fill2 = $("input[name='fill-2']").val();
        var tf1 = $("input[name='tf-1']:checked").val();
        var tf2 = $("input[name='tf-2']:checked").val();

        if(!radioValueMcq1 || !radioValueMcq2 || !fill1 || !fill2 || !tf1 || !tf2){
            $('.error').append("<p style='color:red'>Please answer all questions</p>").fadeIn(1000);
        }
        else{
            $('.terminate,.quiz_area').fadeOut();
            score = calculateScore();
             $('#result').css("display","block");
                if(score>=3){
                $("#result #home").replaceWith('<h2>Congrats &#127881; You Scored</h2><h3>'+score+'/6</h3>');
            }
            else if(score>0){
                $("#result #home").replaceWith('<h2>Work Hard, You Scored</h2><h3>'+score+'/6</h3>');   
            }
            else{
                $("#result #home").replaceWith('<h2>God Bless you ! Your score </h2><h3>'+score+'/6</h3>');
            }
           $('#result').show();  
           }  
    });
    
    $('.prev').click(function (event){
        event.preventDefault();
        var $thisParent = $(this).closest('div.content');
        $('.next').removeAttr('disabled'); 
        $thisParent.fadeOut(100, function(){
            if ($thisParent.prev('.content').length > 0) {
                $thisParent.prev('.content').fadeIn();
            } else {
                $('body').append('<span style="color:#000;">the test is finished : ) </span>')
            }
        });
    });
  
  function calculateScore(){
  	    	var radioValueMcq1 = $("input[name='mcq-1']:checked").val();
            var radioValueMcq2 = $("input[name='mcq-2']:checked").val();
            var fill1 = $("input[name=fill-1]").val();
            var fill2 = $("input[name=fill-2]").val();
            var tf1 = $("input[name=tf-1]:checked").val();
            var tf2 = $("input[name=tf-2]:checked").val();
           
            	if(radioValueMcq1 === "sort()"){
		    		score++;
		    	}
		    	if(radioValueMcq2 === "sort()"){
		    		score++;
		    	}
		    	if(fill1 == "Penguin" || fill1 == "penguin"){
		    		score++;
		    	}
		    	if(fill2 == "Neil Armstrong" || fill2 == "neil Armstrong" || fill2 == "neil armstrong"
		    	 || fill2 == "Neil armstrong"){
		    		score++;
		    	}
				if(tf1 === "True"){
		    		score++;
		    	}
		    	if(tf2 === "True"){
		    		score++;
		    	}
		    
    	return score;   	
    }
   
});