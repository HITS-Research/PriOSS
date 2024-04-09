import json
import random
import randomname

min_ts = 1263046226
max_ts = 1711548678
    
def gen_name():
    name = randomname.generate(('nm/people/butlers', 'nm/people/computing'), ('nm/surnames/italian','nm/surnames/german', 'nm/surnames/english'), sep=' ')
    name = ' '.join([n.capitalize() for n in name.split(' ')])
    return name

def gen_timestamp():
    return random.randint(min_ts, max_ts)

def gen_name_with_timestamp():
    return {'name': gen_name(), 'timestamp': gen_timestamp()}

def people_you_may_know(n):
    return [{'value': gen_name()} for _ in range(n)]

def gen_list_with_names_timestamps(n):
    return [gen_name_with_timestamp() for _ in range(n)]

data = None

with open('./people_you_may_know.json', 'r') as f:
    data = json.load(f)
data['label_values'][0]['vec'] = people_you_may_know(20)
with open('./people_you_may_know.json', 'w') as f:
    json.dump(data, f, indent=4)
    
# with open('./removed_friends.json', 'r') as f:
#     data = json.load(f)
# data['deleted_friends_v2'] = gen_list_with_names_timestamps(20)
# with open('./removed_friends.json', 'w') as f:
#     json.dump(data, f, indent=4)

