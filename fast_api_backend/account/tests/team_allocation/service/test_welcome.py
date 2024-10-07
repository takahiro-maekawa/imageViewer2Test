def test_allocation_new_user_with_new_team(teamAllocationService, SessionLocal):
  # サービスが機能していることを確認
  user = teamAllocationService.findAppUserById(id=1)
  assert user == None
  
  teamAllocationService.createUserWithNewTeam(team_name="trinity", user_name="edgeMan", user_email="edgeMann@cmail.com")
  
  allocation = teamAllocationService.findAllocationById(id=1)
  assert allocation.read_level == 2
  assert allocation.user.email == "edgeMann@cmail.com"
  assert allocation.team.name == "trinity"
  assert allocation.version == 1