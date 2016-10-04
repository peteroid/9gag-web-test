var shell = require('shelljs');
var fs = require('fs');

var posts = []
var crawlOptions = {
  count: 200
}

var getUrl = function (endId) {
  return "curl -s 'https://www.instagram.com/query/' -H 'cookie: mid=Vwnp4AAEAAGkWKLQt9gglpyo8GL4; sessionid=IGSC5e0ae1360eefd3d682ad3e19a5603fad477a2544b044865867590ab5d79cdc20%3AVHmTARVCbhwQKdSTiqLwMZLFtlMrcDUe%3A%7B%22_token_ver%22%3A2%2C%22_auth_user_id%22%3A3027269568%2C%22_token%22%3A%223027269568%3Am502Uyf9huJ8bsy6gFVaXJnq2Avw2z9G%3Abbe19a3a3b00f48005813f5d753d9e8039cbbac6ed262e9a04c067f9fc9af682%22%2C%22asns%22%3A%7B%22223.18.139.219%22%3A9304%2C%22time%22%3A1475522194%7D%2C%22_auth_user_backend%22%3A%22accounts.backends.CaseInsensitiveModelBackend%22%2C%22last_refreshed%22%3A1475522194.630692%2C%22_platform%22%3A4%2C%22_auth_user_hash%22%3A%22%22%7D; ig_pr=2; ig_vw=1440; csrftoken=9RivdlS59SQ2QEj9SANw63iSNwrXHREc; s_network=; ds_user_id=3027269568' -H 'origin: https://www.instagram.com' -H 'accept-encoding: gzip, deflate, br' -H 'accept-language: en-US,en;q=0.8' -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36' -H 'x-requested-with: XMLHttpRequest' -H 'x-csrftoken: 9RivdlS59SQ2QEj9SANw63iSNwrXHREc' -H 'x-instagram-ajax: 1' -H 'content-type: application/x-www-form-urlencoded' -H 'accept: */*' -H 'referer: https://www.instagram.com/9gag/' -H 'authority: www.instagram.com' --data 'q=ig_user(259220806)+%7B+media.after(" +
    (endId || "1353034800877264050") +
    "%2C+12)+%7B%0A++count%2C%0A++nodes+%7B%0A++++caption%2C%0A++++code%2C%0A++++comments+%7B%0A++++++count%0A++++%7D%2C%0A++++comments_disabled%2C%0A++++date%2C%0A++++dimensions+%7B%0A++++++height%2C%0A++++++width%0A++++%7D%2C%0A++++display_src%2C%0A++++id%2C%0A++++is_video%2C%0A++++likes+%7B%0A++++++count%0A++++%7D%2C%0A++++owner+%7B%0A++++++id%0A++++%7D%2C%0A++++thumbnail_src%2C%0A++++video_views%0A++%7D%2C%0A++page_info%0A%7D%0A+%7D&ref=users%3A%3Ashow' --compressed"
}

var getPosts = function (endId) {
  shell.exec(getUrl(endId),
    {silent: true},
    function(code, stdout, stderr) {
      // console.log("code: %s", code)
      // console.log("stdout: %s", stdout)
      var json = JSON.parse(stdout)
      console.log(json.media.page_info)
      posts = posts.concat(json.media.nodes)
      console.log("%s element", posts.length)
      if (posts.length > crawlOptions.count)
        savePosts()
      else 
        getPosts(json.media.page_info.end_cursor)
      // console.log("stderr: %s", stderr)
    })
}

var savePosts = function () {
  fs.writeFile(__dirname + "/posts.txt", JSON.stringify(posts), function(err) {
      if(err) {
          return console.log(err);
      }

      console.log("The file was saved!");
  });
}

getPosts()