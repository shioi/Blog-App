import { useEffect, useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'

//component
import UserBlogDetails from "../components/UserBlogDetails"

const Account = ({func, setTitle, setBody}) => {
    const user = useAuthContext()
    const [userinfo, setUserInfo] = useState('')
    const [userposts, setUserPosts] = useState('')
    useEffect(() => {
        const fetchAccountInfo = async () => {
            const results = await fetch('/api/account', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user.user.token}`
                }
            });
            const json = await results.json()
            if (results.ok) {
                setUserInfo(json)
                //send another request to get all the post the user made
                const results2 = await fetch('/api/accountpost', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.user.token}`
                    }
                });
                const json2 = await results2.json()
                if (results2.ok) {
                        setUserPosts(json2)
                    }
            }
        }
        fetchAccountInfo()
    }, [user])

    return (
       <div id="intro" class="container bootstrap snippets bootdey p-5">
<div class="row ng-scope">
    <div class="col-md-3">
        <div class="panel panel-default">
            <div class="panel-body text-center">
                <div class="pv-lg"><img class="center-block img-responsive img-circle img-thumbnail thumb96" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Contact"/></div>
                            <h3 class="m0 text-bold">{userinfo.username}</h3>
                <div class="mv-lg">
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-9">
        <div class="panel panel-default">
            <div class="panel-body">
                <div class="h4 text-center">Your Posts</div>
                            <div class="row">
                                {userposts && 
                                    userposts.map((post) => (
                                        <UserBlogDetails key={post._id}
                                            blog={post} func={func}
                                            setTitle={setTitle}
                                            setBody={setBody}
                                        />
                                    ))
                                }
                </div>
            </div>
        </div>
    </div>
</div>
</div>
    )
}

export default Account;