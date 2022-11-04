import './Comments.scss'

const Comments = () => {
    const comments = [{
        id: 1,
        desc: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos rerum nobis similique deleniti quo molestiae exercitationem dolor minima unde iste! Sunt libero alias deserunt a esse possimus blanditiis facilis temporibus.',
        name: 'jhon',
        userId: 1,
        profilePicture: 'https://images.pexels.com/photos/13835274/pexels-photo-13835274.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load'

    }, {
        id: 2,
        desc: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos rerum nobis similique deleniti quo molestiae exercitationem dolor minima unde iste! Sunt libero alias deserunt a esse possimus blanditiis facilis temporibus.',
        name: 'jhon',
        userId: 2,
        profilePicture: 'https://images.pexels.com/photos/13984633/pexels-photo-13984633.jpeg'

    }]
    return (
        <div className="comments">
            <div className="write">
                <img src="https://images.pexels.com/photos/13984633/pexels-photo-13984633.jpeg" alt="" />
                <input type="text" name="" id="" placeholder='write a comment' />
                <button>Send</button>

            </div>
            {comments.map(comment => (
                <div className="comment" key={comment.id}>
                    <img src={comment.profilePicture} alt="" />
                    <div className="info">
                        <span>{comment.name}</span>
                        <p>{comment.desc}</p>
                    </div>
                    <span className='date'>1 hour ago</span>
                </div>
            ))}
        </div>

    )
}

export default Comments