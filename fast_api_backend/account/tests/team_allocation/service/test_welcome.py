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

def test_allocation_new_user_with_existing_team(teamAllocationService, SessionLocal):
  # サービスが機能していることを確認
  user = teamAllocationService.findAppUserById(id=1)
  assert user == None
  
  alloc = teamAllocationService.createUserWithNewTeam(team_name="trinity", user_name="edgeMan", user_email="edgeMann@cmail.com")
  
  allocation = teamAllocationService.findAllocationById(id=alloc["id"])
  assert allocation['user']['name'] == 'edgeMan'
  
  # チーム情報が格納されたパスコードを生成
  passcode = teamAllocationService.exportPassCodeByTeamId(1)
  decoded = teamAllocationService.decodePassCode(passcode)
  assert decoded["team_name"] == "trinity"
  assert decoded["team_id"] == 1
  assert decoded["iat"] != None
  
  # 既存のチームにユーザを追加
  alloc = teamAllocationService.createUserWithExistingTeamWithTeamId(team_id=1, user_name="judgeMann", user_email="judgeMann@cmail.com")
  allocation = teamAllocationService.findAllocationById(id=alloc["id"])
  assert allocation["team"]["name"] == "trinity"
  assert allocation["user"]["name"] == "judgeMann"
  assert allocation["user"]["email"] == "judgeMann@cmail.com"
  assert allocation["read_level"] == 0
  
  # パスコードを用いて、フォロワーユーザを取得できていることを確認
  alloc2 = teamAllocationService.createUserWithExistingTeamWithPasssCode(passcode=passcode, user_name="aaaa", user_email="aaaa@vmail.com")
  
  # 不適当なパスコードを埋め込んで認証を要求した場合
  allocDummy = teamAllocationService.createUserWithExistingTeamWithPasssCode(passcode="test", user_name="aaaa", user_email="aaaa@vmail.com")
  assert allocDummy == None
  
  # チームが１つだけ登録されていることを確認
  teamCount = teamAllocationService.countTeams()
  
  # ユーザが3人登録されていることを確認
  # userCount = teamAllocationService.countUsers()
    
  # ユーザのメルアドから関連テーブルを持って来れることを確認
  # allocations = teamAllocationService.findAllocationsByUserEmail("aaaa@vmail.com")
  
  # メールアドレスを条件にして、ユーザを取得できることを確認
  # user = teamAllocationService.findUsersByEmail("")
  
  # チーム名を条件にして、チームを取得できることを確認
  # team = teamAllcationService.findTeamByTeamName("trinity")
  
  # 関連テーブルをチームIDを条件にして検索し、きちんと3人のユーザが紐づいたオブジェクトが取得できていることを確認
  # team = teamAllocationService.findTeamAllocatedUsers(1)
  
  # 関連テーブルをユーザIDを条件にして検索し、1つずつのチームが紐づいていることを確認