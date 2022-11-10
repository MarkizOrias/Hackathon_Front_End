
from brownie import network
from scripts.get_hash import hash_file, user_input
from scripts.deploy_creator import deploy_CRL_Creator
from scripts.helpful_scripts import get_account, LOCAL_BLOCKCHAIN_ENVIRONMENTS
import time, pytest


# This tests "arrayLengthGetter()" function also.
def test_add_certificate():
    # Arrange
    if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip("Only for integration testing")
    account = get_account()
    creator = deploy_CRL_Creator()
    raw_array, raw_client_array = creator.arrayLengthGetter(account, {"from": account})
    add_cert_fee = creator.getMinimumFee() + 100
    # Act
    creator.addCertificate(
        "certificate",
        "date",
        "title",
        account,
        "name",
        "additional",
        hash_file(user_input),
        {"from": account, "value": add_cert_fee}
    )
    time.sleep(15)
    # Assert
    cert_array, client_array = creator.arrayLengthGetter(account, {"from": account})
    assert raw_array == 0
    assert cert_array == 1
