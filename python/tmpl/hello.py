#!/usr/bin/python

a, b, c = 1, 2, "速度弄直"

counter = 100

miles = 1000.0

name = "孙东芝"

str = "Hello world"

print(counter)

print(miles)

print(name)

print(a, b, c)

print(str[2:])

dict = {}
dict['one'] = "This is one"
dict[2] = "This is two"

tinydict = {'name': 'john', 'code': 6734, 'dept': 'sales'}


print(dict['one'])          # 输出键为'one' 的值
print(dict[2])              # 输出键为 2 的值
print(tinydict)             # 输出完整的字典
print(tinydict.keys())      # 输出所有键
print(tinydict.values())    # 输出所有值


print('-----------------------------------');


print(repr('sundongzhi \n sdweww'))

print(list([1,2,3]))
print(tuple([1,2,3]))



a = 20
b = 20

if ( a is b ):
   print ("1 - a 和 b 有相同的标识")
else:
   print ("1 - a 和 b 没有相同的标识")

if ( id(a) == id(b) ):
   print ("2 - a 和 b 有相同的标识")
else:
   print ("2 - a 和 b 没有相同的标识")


b = 30
if ( a is b ):
   print ("3 - a 和 b 有相同的标识")
else:
   print ("3 - a 和 b 没有相同的标识")

if ( a is not b ):
   print ("4 - a 和 b 没有相同的标识")
else:
   print ("4 - a 和 b 有相同的标识")

str = "www.runoob.com"
sub = 'o'
print("str.count('o') : ", str.count(sub))
