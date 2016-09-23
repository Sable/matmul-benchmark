function runner(size)
    m=size;
    k=size/2;
    n=size;

    A = rand(m,k);
    B = rand(k,n);

    tic();
    C = A * B;
    t = toc();

    ADJUST=521/size;
    checksum = fletcherSum(floor(ADJUST*C));

    disp('{');
    disp('"options":');
    disp(size);
    disp(', "time": ');
    disp(t);
    disp(', "output":');
    disp(checksum);
    disp('}');
end
