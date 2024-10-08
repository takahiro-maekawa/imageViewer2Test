def test_allocation_new_user_with_new_team(teamAllocationService, SessionLocal):
  # サービスが機能していることを確認
  user = teamAllocationService.findAppUserById(id=1)
  assert user == None
  
  alloc = teamAllocationService.createUserWithNewTeam(team_name="trinity", user_name="edgeMan", user_email="edgeMann@cmail.com")
  
  allocation = teamAllocationService.findAllocationById(id=alloc["id"])
  assert allocation['user']['name'] == 'edgeMan'
  
  passcode = teamAllocationService.exportPassCodeByTeamId(1)
  decoded = teamAllocationService.decodePassCode(passcode)
  assert decoded["team_name"] == "trinity"
  assert decoded["team_id"] == 1
  assert decoded["iat"] != None