const UserForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();

        const first = e.target.typeInput1.value;
        const second = e.target.typeInput2.value;
        const third = e.target.typeInput3.value;
        const fourth = e.target.typeInput4.value;

        if (first.length == 0) {
            alert('You must select a file to certify first!');
        } else if (second.length == 0 || third.length == 0) {
            alert('You must fill all required fields below!');
        } else {
            const obj = { _title: second, _name: third, _additional: fourth };
            const myJSON = JSON.stringify(obj);

            localStorage.setItem("testJSON", myJSON); //F12=>Application->Storage->localstorage->testJSON file
        }


    }
    return (
        <div>
            <img src="logoOTT.png" alt="LogoOTT" width="120" height="120" />
            <br />
            <img src="logoCERTI.png" alt="LogoCERTI" width="379" height="111" />
            <br />
            <label />
            <h2 className="form-check-msg">Store your copyrights on a blockchain in just 5 steps!</h2>
            <br />
            <form onSubmit={handleSubmit}>
                <h3 className="form-check"><span className="badge bg-custom mar-bot"> 1 </span>&nbsp;Select the file from your system< br /><input className="form-control" type="file" id="type-input" name="typeInput1" /></h3>
                <h3 className="form-check"><span className="badge bg-custom mar-bot"> 2 </span>&nbsp;Title of your work < br /><input className="form-control" type="text" id="title-input" name="typeInput2" /></h3>
                <h3 className="form-check"><span className="badge bg-custom mar-bot"> 3 </span>&nbsp;Your name<br /><input className="form-control" type="text" id="name-input" name="typeInput3" /></h3>
                <h3 className="form-check"><span className="badge bg-custom mar-bot"> 4 </span>&nbsp;Co-author<br /><input className="form-control" type="text" id="co-author-input" name="typeInput4" /></h3>
                <h3 className="form-check"><span className="badge bg-custom mar-bot"> 5 </span>&nbsp;Store your copyrights on-chain<br /><button className="button" id="store-button" name="store-button">Store</button></h3>
            </form>
        </div >
    )
}
export default UserForm