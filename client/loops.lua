RegisterNUICallback('get-tweets', function(_, cb)
    lib.callback('z-phone:server:GetTweets', false, function(tweets)
        cb(tweets)
    end)
end)

RegisterNUICallback('send-tweet', function(body, cb)
    lib.callback('z-phone:server:SendTweet', false, function(isOk)
        lib.callback('z-phone:server:GetTweets', false, function(tweets)
            cb(tweets)
        end)
    end, body)
end)

RegisterNUICallback('get-tweet-comments', function(body, cb)
    lib.callback('z-phone:server:GetComments', false, function(comments)
        cb(comments)
    end, body)
end)

RegisterNUICallback('send-tweet-comments', function(body, cb)
    body.username = Profile.username
    lib.callback('z-phone:server:SendTweetComment', false, function(isOk)
        cb(isOk)
    end, body)
end)