from DB import guest_db

def get_state_from_guest():
	data = guest_db.Guest_db().get_all_guest_state()
	
	guest = open('guest.csv', 'w')
	for d in data:
		el = str(d[1])
		d = (d[0], el)
		myData = ','.join(d)
		print(myData)
		guest.write(myData + '\n')
	guest.close()

	return "True"



if __name__ == '__main__':

	get_state_from_guest()