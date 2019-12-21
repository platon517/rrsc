# React remote screen control (rrsc)

### Video demo
[YouTube](https://youtu.be/PmQ8zDAffo8)

### Live Demo 
[Remote user](https://react-remote-screen-control.herokuapp.com/user)   
[Admin](https://react-remote-screen-control.herokuapp.com)

### How to use?

Default connection plate component:
```javascript
import {RrscPlate} from "rrsc";
...
    <RrscPlate
      normalCursorKey={/* keycode for showing mouse cursor (not required) */}
      videoContainer={/* HOC for video (not required) */}
      videoProps={/* props for video (not required) */}
      isAbleCall={/* define if user is admin */}
      server={/* server_url */}
    />
...
```

Create your own component via HOC:
```javascript
import {withRRSC} from "rrsc";
...
    const MyComponent = 
      ({
       rrscMyId,
       rrscContrUserId,
       rrscSetContrUserId,
       rrscAskContrUser,
       rrscIsStreaming,
       rrscDisconnect,
       isAbleCall
     }) => 
      <div>
        <div>My id: {rrscMyId}</div>
          {
            isAbleCall &&
              <>
                <input
                  value={rrscContrUserId}
                  onChange={e => rrscSetContrUserId(e.target.value)}
                  disabled={rrscIsStreaming}
                />
                {!rrscIsStreaming && (
                  <button disabled={!rrscContrUserId} onClick={rrscAskContrUser}>
                    call
                  </button>
                )}
              </>
          }
          {rrscIsStreaming && (
            <button onClick={rrscDisconnect}>disconnect</button>
          )}
      </div>;

    const MyRRSCPlate = withRRSC(MyComponent);
...
```
