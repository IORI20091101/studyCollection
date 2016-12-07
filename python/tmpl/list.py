#!/usr/bin/python
list = ['Google', 'Runoob', 1997, 2000]

print ("第三个元素为 : ", list[2])
list[2] = 2001
print ("更新后的第三个元素为 : ", list[2])


print(len(list))


tup1 = (50,);
print(tup1[0])

dict = {'Name': 'Runoob', 'Age': 7, 'Class': 'First'}


print ("dict['Name']: ", dict['Name'])
print ("dict['Age']: ", dict['Age'])

print(type(dict))


seq = ('name', 'age', 'sex')

dict = dict.fromkeys(seq)
print ("新的字典为 : %s" %  str(dict))

dict = dict.fromkeys(seq, 10)
print ("新的字典为 : %s" %  str(dict))

print ("Value : %s" %  dict.items())



a, b = 0, 1
while b < 1000:
    print(b, end=',')
    a, b = b, a+b



num=int(input("输入一个数字："))
if num%2==0:
    if num%3==0:
        print ("你输入的数字可以整除 2 和 3")
    else:
        print ("你输入的数字可以整除 2，但不能整除 3")
else:
    if num%3==0:
        print ("你输入的数字可以整除 3，但不能整除 2")
    else:
        print  ("你输入的数字不能整除 2 和 3")