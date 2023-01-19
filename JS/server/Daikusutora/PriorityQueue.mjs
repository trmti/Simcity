export function Pair(data, priority)
{
    return {"data":data, "priority":priority}
}

export function PriorityQueue()
{
    this.arr = []
}

PriorityQueue.prototype.num = function()
{
    return this.arr.length
}
PriorityQueue.prototype.end=function()
{
    return this.num() - 1
}
PriorityQueue.prototype.parent=function(i)
{
    if(i == 0)
    {
        return false
    }
    else if(i % 2 == 0)
    {
        return i / 2 - 1
    }
    else
    {
        return (i - 1) / 2
    }
}
PriorityQueue.prototype.small_child=function(i)
{
    if(i >= this.end() / 2)
    {
        return false
    }
    else if(i*2+2 > this.end())
    {
        return i*2+1
    }
    else
    {
        return this.arr[i*2 + 1]["priority"] <= this.arr[i*2 + 2]["priority"] ? (i*2 + 1) : (i*2 + 2);
    }
}
PriorityQueue.prototype.swap=function(i, j)
{
    var a = this.arr[i]
    this.arr[i] = this.arr[j]
    this.arr[j] = a
}
PriorityQueue.prototype.shift_end_up=function()
{
    var i = this.end()
    while(i != 0 && this.arr[i]["priority"] < this.arr[this.parent(i)]["priority"])
    {
        this.swap(i, this.parent(i))
        i = this.parent(i)
    }
}
PriorityQueue.prototype.shift_root_down=function()
{
    var i = 0
    while(this.small_child(i) && this.arr[i]["priority"] > this.arr[this.small_child(i)]["priority"])
    {
        let child = this.small_child(i)
        this.swap(i, child)
        i = child
    }
}
PriorityQueue.prototype.enqueue=function(data, priority)
{
    this.arr.push(Pair(data, priority))
    this.shift_end_up()
}
PriorityQueue.prototype.dequeue=function()
{
    // const result = this.arr[0]
    this.swap(0, this.end())
    let result = this.arr.pop()
    this.shift_root_down()
    return result
}