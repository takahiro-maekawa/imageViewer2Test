def test_empty(teamAllocationService):
  user = teamAllocationService.findAppUserById(id=1)
  assert user == None