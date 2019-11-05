### profile
#### Get user profile
```
GET 
Content-Type: application/json
/api/profile
REQUEST
{
    psid: <PSID>
}
SUCCESS RESPONSE
{
    err: null, 
    docs: {
        psid: String,
        first_name: String,
        last_name: String,
        profile_pic: String,
        classes: String,
        labels: Array,
    }
}

```
#### Update user profile
```
POST 
Content-Type: application/json
/api/profile
REQUEST
{
    psid: <PSID>
}
SUCCESS RESPONSE
{
    err: null, 
    docs: {
        labels: Array
    }
}
```