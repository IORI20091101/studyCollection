# while True:
#     word = raw_input('please enter a word')
#     if not word: break
#     print 'The word was ' + word

# from math import sqrt
# for n in range(99, 80, -1):
#     root = sqrt(n)
#     if root == int(root):
#         print n
#         break
# else:
#     print "Didn't find it!"

girls = ['alice', 'bernice', 'clarice']

boys = ['chris', 'arnold', 'bob']

letterGirls = {}

for girl in girls:
    letterGirls.setdefault(girl[0], []).append(girl)

print [b + '+' + g for b in boys for g in letterGirls[b[0]]]


for i,j in enumerate([1,2,3]):
    print i, j