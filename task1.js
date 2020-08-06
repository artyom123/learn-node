process.stdin.on('data', (data) => {
    const reverseString = data.toString().split('').reverse().join('').trim();
    process.stdout.write(`${reverseString}\n\n`);
});
