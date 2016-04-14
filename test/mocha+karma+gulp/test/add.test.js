describe('加法函数的测试', function() {
  it('4 + 5 = 9', function() {
    expect(4+5).equal(9);

  });

  it('1 加 1 应该等于 2', function() {
    expect(add(1, 1)).to.be.equal(2);

  });
});