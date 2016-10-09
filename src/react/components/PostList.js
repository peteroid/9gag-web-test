var React = require('react')
var PropTypes = React.PropTypes
var moment = require('moment')

var Post = React.createClass({
  getInitialState() {
    return {
      isPlaying: false
    }
  },

  getProcessedCaption(c) {
    var captionbObj = {
      caption: [],
      raw: c.slice()
    }
    
    while (captionbObj.raw.length > 0) {
      var nextTag = captionbObj.raw.indexOf('#')
      var nextMention = captionbObj.raw.indexOf('@')

      if (nextTag > -1 && nextMention > -1) {
        if (nextTag > nextMention) {
          this.processElements(captionbObj, 'mention', nextMention)
        } else {
          this.processElements(captionbObj, 'tag', nextTag)
        }
      } else if (nextTag > -1) {
        this.processElements(captionbObj, 'tag', nextTag)
      } else if (nextMention > -1) {
        this.processElements(captionbObj, 'mention', nextMention)
      } else {
        this.processElements(captionbObj, 'tag', nextTag)
      }
    }

    return captionbObj
  },

  processElements(obj, key, index) {
    if (index > 0) {
      obj.caption.push({
        type: 'text',
        text: obj.raw.slice(0, index)
      }, {
        type: 'text',
        text: ' '
      })
    }
    obj.raw = obj.raw.slice(index + 1)

    
    var nextSpace = obj.raw.indexOf(' ')
    var o = {}
    if (nextSpace > -1) {
      obj.caption.push({
        type: key,
        text: obj.raw.slice(0, nextSpace)
      },  {
        type: 'text',
        text: ' '
      })
      obj.raw = obj.raw.slice(nextSpace + 1)
    } else {
      obj.caption.push({
        type: key,
        text: obj.raw
      },  {
        type: 'text',
        text: ' '
      })
      obj.raw = ''
    }
    
    return obj
  },

  numberAbbrs: [
    'k', 'm', 'b'
  ],

  getFormatNumber(n) {
    var i = parseInt(n)
    if (i < 1000) {
      return String(i)
    } else {
      var count = 0
      while (i >= 1000000) {
        count++
        i /= 1000
      }
      return String(Math.round(i / 100) / 10) + this.numberAbbrs[count]
    }
  },

  playVideo(e) {
    e.preventDefault()
    this.setState({
      isPlaying: true
    })
  },

  onVideoMount(v) {
    if (v) {
      window._v = v
      v.addEventListener('ended', function (e) {
        this.setState({
          isPlaying: false
        })
      }.bind(this), true)

      v.play()
    }
  },

  render() {
    return (
      <div className="post-link row">
        <a target="_blank" href={'//www.instagram.com/p/' + this.props.code} className="post-img-wrapper col-sm-7 col-xs-12">
          {this.props.is_video && !this.state.isPlaying? (<span onClick={this.playVideo} className="post-video-play"><i className="fa fa-play-circle-o"></i></span>) : ('')}
          <div style={{backgroundImage: 'url(' + (this.state.isPlaying? '' : (this.props.is_video? this.props.thumbnail_src : this.props.display_src)) + ')'}} className="post-img v-container">
            {this.state.isPlaying? (
              <video src={this.props.video_url} className="post-video v-center" ref={this.onVideoMount}/>
            ) : (
              ''
            )}
          </div>
        </a>
        <div className="post-content col-sm-5">
          <p>
            {this.getProcessedCaption(this.props.caption).caption.map((o, i) => {
              switch (o.type) {
                case 'text':
                  return <span key={i}>{o.text} </span>
                case 'tag':
                  return <a key={i} target="_blank" href={'//www.instagram.com/explore/tags/' + o.text}>#{o.text}</a>
                case 'mention':
                  return <a key={i} target="_blank" href={'//www.instagram.com/' + o.text}>@{o.text}</a>
              }
            })}
            <span className="post-attr">
              <i className="fa fa-heart"></i>
              <span className="post-attr-value">{this.getFormatNumber(this.props.likes.count)}</span>
            </span>
            <span className="post-attr">
              <i className="fa fa-comment"></i>
              <span className="post-attr-value">{this.getFormatNumber(this.props.comments.count)}</span>
            </span>
            <span className="post-attr">
              <i className="fa fa-clock-o"></i>
              <span className="post-attr-value">{moment(parseInt(this.props.date + '000')).fromNow(true)}</span>
            </span>
          </p>

        </div>
      </div>
    )
  }
})

function PostList(props) {
  return (
    <ul onClick={props.onClick} className="post-list row">
      {
        props.posts.map((post, index) => {
          return (
            <li key={index} className="post-list-item col-md-6 col-xs-12">
              <Post {...post} />
            </li>
          )
        })
      }
    </ul>
  )
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired
}

module.exports = PostList