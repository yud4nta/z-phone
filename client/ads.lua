RegisterNUICallback('get-ads', function(_, cb)
    lib.callback('z-phone:server:GetAds', false, function(ads)
        cb(ads)
    end)
end)

RegisterNUICallback('send-ads', function(body, cb)
    lib.callback('z-phone:server:SendAds', false, function(isOk)
        lib.callback('z-phone:server:GetAds', false, function(ads)
            cb(ads)
        end)
    end, body)
end)