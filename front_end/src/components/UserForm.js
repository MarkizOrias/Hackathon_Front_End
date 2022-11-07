const UserForm = () => {

    return (
        <div>
            <img src="logoOTT.png" alt="LogoOTT" width="120" height="120" />
            <br />
            <img src="logoCERTI.png" alt="LogoCERTI" width="379" height="111" />
            <br />
            <label />
            <h2 class="form-check-msg">Store your copyrights on a blockchain in just 5 steps!</h2>
            <br />
            <h3 class="form-check"><span class="badge bg-custom mar-bot"> 1 </span>&nbsp;Select the file from your system< br /><input class="form-control" type="file" id="type-input" name="type-input" /></h3>
            <h3 class="form-check"><span class="badge bg-custom mar-bot"> 2 </span>&nbsp;Title of your work < br /><input class="form-control" type="text" id="title-input" name="type-input" /></h3>
            <h3 class="form-check"><span class="badge bg-custom mar-bot"> 3 </span>&nbsp;Your name<br /><input class="form-control" type="text" id="name-input" name="type-input" /></h3>
            <h3 class="form-check"><span class="badge bg-custom mar-bot"> 4 </span>&nbsp;Co-author<br /><input class="form-control" type="text" id="co-author-input" name="type-input" /></h3>
            <h3 class="form-check"><span class="badge bg-custom mar-bot"> 5 </span>&nbsp;Store your copyrights on-chain<br /><button class="button" id="store-button" name="store-button">Store</button></h3>
        </div >
    )
}
export default UserForm