
from brownie import network
from scripts.get_hash import hash_file, user_input
from scripts.deploy_creator import deploy_POP_Creator
from scripts.helpful_scripts import get_account, LOCAL_BLOCKCHAIN_ENVIRONMENTS
import pytest


# This tests "arrayLengthGetter()" function also.
def test_add_certificate():
    # Arrange
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip("Only for local testing")
    account = get_account()
    creator = deploy_POP_Creator()
    raw_array, raw_client_array = creator.arrayLengthGetter(account, {"from": account})
    add_cert_fee = creator.getMinimumFee({"from": account}) + 100
    # Act
    tx = creator.addCertificate(
        "certificate",
        "date",
        "title",
        account,
        "name",
        "additional",
        hash_file(user_input),
        {"from": account, "value": add_cert_fee}
    )
    tx.wait(1)
    # Assert
    cert_array, client_array = creator.arrayLengthGetter(account, {"from": account})
    assert raw_array == 0
    assert cert_array == 1
