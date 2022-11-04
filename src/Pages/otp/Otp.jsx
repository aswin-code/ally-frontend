import './Otp.scss'

const Otp = () => {
    return (
        <div className="otp">
            <div className="card">
                <div className="left">
                    <h1>All<span>y</span></h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, quo! Nihil eaque
                        voluptatibus hic nam molestias sed vel accusantium cum.
                        Repellat quisquam dolore esse deserunt aperiam unde! Dolor,
                        deleniti iure.</p>
                </div>
                <div className="right">
                    <h1>Verify OTP</h1>
                    <form action="">
                        <input type="number" name="otp" id="" placeholder='OTP' />
                        <button>Verify</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Otp